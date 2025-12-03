import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // Defina a organização/projeto se necessário para acessar GPT-5
    organization: process.env.OPENAI_ORG || process.env.OPENAI_ORGANIZATION,
    project: process.env.OPENAI_PROJECT
});

// Ordem de modelos a tentar (sem fallback para famílias anteriores)
const MODEL_CHAIN = ['gpt-5.1', 'gpt-5'];

const formatErrorDetail = (error) => {
    if (error?.response?.data) {
        return typeof error.response.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response.data);
    }
    if (error?.message) return error.message;
    return 'Erro desconhecido';
};

export async function POST(req) {
    try {
        const { image, patientInfo } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'Imagem não fornecida' }, { status: 400 });
        }

        // Read the reference markdown files
        const publicDir = path.join(process.cwd(), 'public');

        const files = [
            'calendario_vacinal_brasil.md',
            'calendario_vacinal_criancas.md',
            'calendario_vacinal_sbim_nascimento_terceira_idade.md',
            'vacinacao_gestantes_rede_privada.md'
        ];

        let combinedContext = '';

        try {
            for (const file of files) {
                const filePath = path.join(publicDir, file);
                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    combinedContext += `\n\n--- CONTEÚDO DO ARQUIVO ${file} ---\n${content}`;
                } else {
                    console.warn(`Arquivo de referência não encontrado: ${file}`);
                }
            }
        } catch (error) {
            console.error("Erro ao ler arquivos de referência:", error);
        }

        const systemPrompt = `
      Você é um especialista em imunização e saúde pública brasileira.
      Sua tarefa é analisar imagens de carteirinhas de vacinação e identificar as vacinas tomadas, comparando com o calendário oficial.

      Use os seguintes documentos como referência principal para o calendário vacinal (SUS, SBIm, Gestantes, Crianças, etc):
      ${combinedContext}

      Analise a imagem fornecida e os dados do paciente:
      - Idade: ${patientInfo?.idade || 'Não informada'}
      - Sexo: ${patientInfo?.situacao || 'Padrão'}
      - Gestante: ${patientInfo?.gestante ? 'SIM' : 'NÃO'}
      - Semanas de Gestação: ${patientInfo?.semanasGestacao || 'N/A'}
      - Carteira de Adulto (apenas registros da vida adulta): ${patientInfo?.carteiraAdulta ? 'SIM' : 'NÃO'}

      IMPORTANTE: Se 'Carteira de Adulto' for SIM, considere que o paciente NÃO tem registros da infância nesta carteirinha. NÃO liste vacinas infantis (BCG, Penta, Polio, Rotavírus, etc) como "vacinasFaltantes", pois assume-se que foram tomadas ou não constam neste documento. Foque EXCLUSIVAMENTE nas vacinas do calendário adulto/idoso/gestante e reforços necessários (ex: dT, Hepatite B, Febre Amarela, Influenza, Covid-19).

      IMPORTANTE: Se a paciente for GESTANTE, verifique rigorosamente as vacinas indicadas para a semana gestacional atual dela (ex: dTpa a partir da 20ª semana, Influenza em qualquer fase, etc). Indique claramente nas "proximasDoses" as vacinas que ela precisa tomar AGORA ou em breve devido à gravidez.
      
      Retorne um JSON estrito com a seguinte estrutura:
      {
        "vacinasTomadas": [
          { "nome": "Nome da Vacina", "data": "DD/MM/AAAA", "lote": "Lote se visível", "dose": "1ª dose, 2ª dose, etc" }
        ],
        "vacinasFaltantes": [
          { "nome": "Nome da Vacina", "motivo": "Não encontrada na carteirinha e indicada para a idade/situação" }
        ],
        "proximasDoses": [
          { "nome": "Nome da Vacina", "dataPrevista": "Data aproximada ou 'Imediato'", "indicacao": "Motivo da indicação (ex: Gestante 20+ semanas)" }
        ],
        "observacoes": "Texto geral sobre a situação vacinal do paciente e recomendações."
      }

      Se a imagem não for uma carteirinha de vacinação ou estiver ilegível, retorne um erro no campo observacoes.
    `;

        const generateReport = async (model) => openai.chat.completions.create({
            model,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analise esta carteirinha de vacinação e forneça o relatório completo em JSON." },
                        { type: "image_url", image_url: { url: image } }
                    ]
                }
            ],
            max_completion_tokens: 4096,
            response_format: { type: "json_object" }
        });

        let response;
        let usedModel = null;

        const errors = [];
        for (const model of MODEL_CHAIN) {
            try {
                response = await generateReport(model);
                usedModel = model;
                break;
            } catch (error) {
                const details = formatErrorDetail(error);
                console.error(`Erro ao chamar OpenAI com modelo ${model}:`, details);
                errors.push({ model, details });
            }
        }

        if (!response) {
            return NextResponse.json({
                error: `Não foi possível usar os modelos disponíveis (${MODEL_CHAIN.join(', ')}) para analisar a carteirinha.`,
                detalhes: errors
            }, { status: 502 });
        }

        const content = response.choices[0].message.content;

        try {
            const jsonResponse = JSON.parse(content);
            jsonResponse.modeloUtilizado = usedModel;
            jsonResponse.cadeiaModelosTentados = MODEL_CHAIN;
            return NextResponse.json(jsonResponse);
        } catch (e) {
            console.error("Erro ao fazer parse do JSON do OpenAI:", e);
            return NextResponse.json({ error: 'Erro ao processar resposta da IA', raw: content }, { status: 500 });
        }

    } catch (error) {
        console.error("Erro na API de análise:", error);
        return NextResponse.json({ error: 'Erro interno do servidor', details: error.message }, { status: 500 });
    }
}
