import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { image, patientInfo } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'Imagem não fornecida' }, { status: 400 });
        }

        // Read the reference markdown file
        const filePath = path.join(process.cwd(), 'calendario_vacinal_brasil.md');
        const calendarioRef = fs.readFileSync(filePath, 'utf8');

        const systemPrompt = `
      Você é um especialista em imunização e saúde pública brasileira.
      Sua tarefa é analisar imagens de carteirinhas de vacinação e identificar as vacinas tomadas, comparando com o calendário oficial.

      Use o seguinte documento como referência principal para o calendário vacinal (SUS e SBIm):
      ${calendarioRef}

      ALÉM DISSO, considere as seguintes vacinas recomendadas para GESTANTES na rede privada (e pública quando disponível):
      1. dTpa (Difteria, Tétano e Coqueluche): A partir da 20ª semana de gestação.
      2. Hepatite B: 3 doses, se não vacinada anteriormente.
      3. Influenza: Dose única anual, em qualquer idade gestacional.
      4. Covid-19: Conforme esquema vigente.
      5. VSR (Vírus Sincicial Respiratório - Abrysvo): Entre 32 e 36 semanas de gestação (Rede Privada).

      Analise a imagem fornecida e os dados do paciente (Idade: ${patientInfo?.idade || 'Não informada'}, Situação: ${patientInfo?.situacao || 'Padrão'}).
      
      Retorne um JSON estrito com a seguinte estrutura:
      {
        "vacinasTomadas": [
          { "nome": "Nome da Vacina", "data": "DD/MM/AAAA", "lote": "Lote se visível", "dose": "1ª dose, 2ª dose, etc" }
        ],
        "vacinasFaltantes": [
          { "nome": "Nome da Vacina", "motivo": "Não encontrada na carteirinha e indicada para a idade" }
        ],
        "proximasDoses": [
          { "nome": "Nome da Vacina", "dataPrevista": "Data aproximada ou 'Imediato'", "indicacao": "Motivo da indicação" }
        ],
        "observacoes": "Texto geral sobre a situação vacinal do paciente e recomendações."
      }

      Se a imagem não for uma carteirinha de vacinação ou estiver ilegível, retorne um erro no campo observacoes.
    `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
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
            max_tokens: 4096,
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;

        try {
            const jsonResponse = JSON.parse(content);
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
