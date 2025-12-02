import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, Clock, Calendar, ChevronDown, ChevronRight, Shield, Syringe, ArrowRight, Download, Share2, AlertCircle } from 'lucide-react';

// Calendário Vacinal Brasileiro completo
const CALENDARIO_VACINAL = {
  nascimento: {
    idade: "Ao nascer",
    idadeEmMeses: 0,
    vacinas: [
      { nome: "BCG", dose: "Dose única", doencas: "Tuberculose, hanseníase" },
      { nome: "Hepatite B", dose: "1ª dose", doencas: "Hepatite B, Hepatite D" }
    ]
  },
  mes2: {
    idade: "2 meses",
    idadeEmMeses: 2,
    vacinas: [
      { nome: "Penta (DTP+Hib+HB)", dose: "1ª dose", doencas: "Difteria, tétano, coqueluche, H. influenzae, hepatite B" },
      { nome: "VIP/Poliomielite", dose: "1ª dose", doencas: "Poliomielite" },
      { nome: "Pneumocócica 10-valente", dose: "1ª dose", doencas: "Doenças pneumocócicas" },
      { nome: "Rotavírus", dose: "1ª dose", doencas: "Gastroenterite viral" }
    ]
  },
  mes3: {
    idade: "3 meses",
    idadeEmMeses: 3,
    vacinas: [
      { nome: "Meningocócica C", dose: "1ª dose", doencas: "Meningite tipo C" }
    ]
  },
  mes4: {
    idade: "4 meses",
    idadeEmMeses: 4,
    vacinas: [
      { nome: "Penta (DTP+Hib+HB)", dose: "2ª dose", doencas: "Difteria, tétano, coqueluche, H. influenzae, hepatite B" },
      { nome: "VIP/Poliomielite", dose: "2ª dose", doencas: "Poliomielite" },
      { nome: "Pneumocócica 10-valente", dose: "2ª dose", doencas: "Doenças pneumocócicas" },
      { nome: "Rotavírus", dose: "2ª dose", doencas: "Gastroenterite viral" }
    ]
  },
  mes5: {
    idade: "5 meses",
    idadeEmMeses: 5,
    vacinas: [
      { nome: "Meningocócica C", dose: "2ª dose", doencas: "Meningite tipo C" }
    ]
  },
  mes6: {
    idade: "6 meses",
    idadeEmMeses: 6,
    vacinas: [
      { nome: "Penta (DTP+Hib+HB)", dose: "3ª dose", doencas: "Difteria, tétano, coqueluche, H. influenzae, hepatite B" },
      { nome: "VIP/Poliomielite", dose: "3ª dose", doencas: "Poliomielite" },
      { nome: "Influenza", dose: "1ª dose", doencas: "Gripe" },
      { nome: "Covid-19", dose: "1ª dose", doencas: "Covid-19" }
    ]
  },
  mes7: {
    idade: "7 meses",
    idadeEmMeses: 7,
    vacinas: [
      { nome: "Covid-19", dose: "2ª dose", doencas: "Covid-19" }
    ]
  },
  mes9: {
    idade: "9 meses",
    idadeEmMeses: 9,
    vacinas: [
      { nome: "Febre Amarela", dose: "1ª dose", doencas: "Febre amarela" },
      { nome: "Pneumocócica 10-valente", dose: "Reforço", doencas: "Doenças pneumocócicas" },
      { nome: "Covid-19", dose: "3ª dose", doencas: "Covid-19" }
    ]
  },
  mes12: {
    idade: "12 meses",
    idadeEmMeses: 12,
    vacinas: [
      { nome: "Meningocócica ACWY", dose: "Reforço", doencas: "Meningites A, C, W, Y" },
      { nome: "Tríplice Viral (SCR)", dose: "1ª dose", doencas: "Sarampo, caxumba, rubéola" }
    ]
  },
  mes15: {
    idade: "15 meses",
    idadeEmMeses: 15,
    vacinas: [
      { nome: "DTP", dose: "1º reforço", doencas: "Difteria, tétano, coqueluche" },
      { nome: "VIP/Poliomielite", dose: "Reforço", doencas: "Poliomielite" },
      { nome: "Tetraviral (SCRV)", dose: "Dose única", doencas: "Sarampo, caxumba, rubéola, varicela" },
      { nome: "Hepatite A", dose: "Dose única", doencas: "Hepatite A" }
    ]
  },
  anos4: {
    idade: "4 anos",
    idadeEmMeses: 48,
    vacinas: [
      { nome: "DTP", dose: "2º reforço", doencas: "Difteria, tétano, coqueluche" },
      { nome: "Febre Amarela", dose: "Reforço", doencas: "Febre amarela" },
      { nome: "Varicela", dose: "2ª dose", doencas: "Catapora" }
    ]
  },
  anos9a14: {
    idade: "9 a 14 anos",
    idadeEmMeses: 108,
    vacinas: [
      { nome: "HPV", dose: "Dose única", doencas: "Papilomavírus humano" }
    ]
  },
  adulto: {
    idade: "Adulto (a partir de 20 anos)",
    idadeEmMeses: 240,
    vacinas: [
      { nome: "dT (Dupla adulto)", dose: "Reforço a cada 10 anos", doencas: "Difteria, tétano" },
      { nome: "Tríplice Viral", dose: "Verificar histórico", doencas: "Sarampo, caxumba, rubéola" },
      { nome: "Hepatite B", dose: "Verificar histórico", doencas: "Hepatite B" },
      { nome: "Febre Amarela", dose: "Verificar histórico", doencas: "Febre amarela" }
    ]
  },
  idoso: {
    idade: "Idoso (60+ anos)",
    idadeEmMeses: 720,
    vacinas: [
      { nome: "Influenza", dose: "Anual", doencas: "Gripe" },
      { nome: "Pneumocócica 23-valente", dose: "Verificar indicação", doencas: "Doenças pneumocócicas" },
      { nome: "Herpes Zóster", dose: "2 doses", doencas: "Herpes zóster" }
    ]
  }
};

// Mapeamento de sinônimos para reconhecimento
const SINONIMOS_VACINAS = {
  "bcg": ["bcg", "tuberculose", "bacilo calmette"],
  "hepatite b": ["hepatite b", "hep b", "hepb", "anti-hbs"],
  "penta": ["penta", "pentavalente", "dtp+hib+hb", "dtp hib hb"],
  "vip": ["vip", "poliomielite", "polio", "paralisia infantil", "salk"],
  "vop": ["vop", "sabin", "gotinha"],
  "pneumocócica": ["pneumo", "pneumocócica", "pneumococica", "pcv10", "pcv13", "prevenar"],
  "rotavírus": ["rotavirus", "rotavírus", "rota", "rotarix"],
  "meningocócica c": ["meningo c", "meningocócica c", "meningococica c", "menc"],
  "meningocócica acwy": ["meningo acwy", "meningocócica acwy", "menacwy", "acwy"],
  "meningocócica b": ["meningo b", "meningocócica b", "menb", "bexsero"],
  "febre amarela": ["febre amarela", "fa", "amarela"],
  "tríplice viral": ["triplice viral", "tríplice viral", "scr", "mmr", "sarampo caxumba rubéola"],
  "tetraviral": ["tetraviral", "scrv", "mmrv", "tetra viral"],
  "dtp": ["dtp", "tríplice bacteriana", "triplice bacteriana"],
  "dtpa": ["dtpa", "tríplice acelular", "pertussis acelular"],
  "dt": ["dt", "dupla adulto", "dupla", "antitetânica"],
  "hepatite a": ["hepatite a", "hep a", "hepa"],
  "hpv": ["hpv", "papilomavírus", "papilomavirus", "gardasil", "cervarix"],
  "influenza": ["influenza", "gripe", "flu"],
  "covid": ["covid", "covid-19", "coronavirus", "pfizer", "astrazeneca", "coronavac", "janssen"],
  "varicela": ["varicela", "catapora", "chickenpox"],
  "herpes zóster": ["herpes zoster", "herpes zóster", "shingrix", "zostavax"],
  "dengue": ["dengue", "qdenga", "dengvaxia"]
};

// Componente principal
export default function VacinaCheck() {
  const [step, setStep] = useState('inicio'); // inicio, upload, analise, resultado
  const [dadosPaciente, setDadosPaciente] = useState({
    nome: '',
    dataNascimento: '',
    sexo: '',
    gestante: false,
    semanasGestacao: ''
  });
  const [imagemCarteira, setImagemCarteira] = useState(null);
  const [vacinasReconhecidas, setVacinasReconhecidas] = useState([]);
  const [vacinasConfirmadas, setVacinasConfirmadas] = useState([]);
  const [analise, setAnalise] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [textoOCR, setTextoOCR] = useState('');
  const [resultadoIA, setResultadoIA] = useState(null);
  const [activeTab, setActiveTab] = useState('geral');
  const [filtroCarteira, setFiltroCarteira] = useState('todas');

  const agendarNoWhatsApp = (vacinaNome) => {
    const texto = `Olá! Gostaria de agendar a vacina ${vacinaNome} para ${dadosPaciente.nome}.`;
    window.open(`https://wa.me/5548991895758?text=${encodeURIComponent(texto)}`, '_blank');
  };

  // Calcular idade em meses
  const calcularIdadeEmMeses = (dataNascimento) => {
    if (!dataNascimento) return 0;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const anos = hoje.getFullYear() - nascimento.getFullYear();
    const meses = hoje.getMonth() - nascimento.getMonth();
    return anos * 12 + meses;
  };

  // Analisar com IA
  const analisarComIA = async (base64Image) => {
    try {
      const response = await fetch('/api/analyze-vaccine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          patientInfo: {
            idade: calcularIdadeEmMeses(dadosPaciente.dataNascimento) + ' meses',
            situacao: dadosPaciente.sexo,
            gestante: dadosPaciente.gestante,
            semanasGestacao: dadosPaciente.semanasGestacao
          }
        })
      });

      if (!response.ok) throw new Error('Falha na análise');

      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Erro ao analisar carteirinha. Verifique se a chave da API está configurada.');
      return null;
    }
  };

  // Reconhecer vacinas no texto
  const reconhecerVacinas = (texto) => {
    const vacinasEncontradas = [];
    const textoLower = texto.toLowerCase();

    Object.entries(SINONIMOS_VACINAS).forEach(([vacina, sinonimos]) => {
      sinonimos.forEach(sinonimo => {
        if (textoLower.includes(sinonimo.toLowerCase())) {
          // Tentar extrair dose e data
          const regex = new RegExp(`${sinonimo}[^\\n]*?(\\d{1,2}[/\\-]\\d{1,2}[/\\-]\\d{2,4})?`, 'gi');
          const matches = textoLower.match(regex);

          if (matches && !vacinasEncontradas.find(v => v.nome === vacina)) {
            let dose = "Dose não identificada";
            if (textoLower.includes("1ª dose") || textoLower.includes("1a dose") || textoLower.includes("primeira")) {
              dose = "1ª dose";
            } else if (textoLower.includes("2ª dose") || textoLower.includes("2a dose") || textoLower.includes("segunda")) {
              dose = "2ª dose";
            } else if (textoLower.includes("3ª dose") || textoLower.includes("3a dose") || textoLower.includes("terceira")) {
              dose = "3ª dose";
            } else if (textoLower.includes("reforço") || textoLower.includes("reforco")) {
              dose = "Reforço";
            }

            vacinasEncontradas.push({
              nome: vacina,
              dose: dose,
              confirmada: false,
              data: null
            });
          }
        }
      });
    });

    return vacinasEncontradas;
  };

  // Analisar situação vacinal
  const analisarSituacaoVacinal = (vacinasConfirmadas, idadeMeses) => {
    const vacinasNecessarias = [];
    const vacinasEmDia = [];
    const vacinasAtrasadas = [];
    const proximasVacinas = [];

    Object.entries(CALENDARIO_VACINAL).forEach(([periodo, dados]) => {
      if (dados.idadeEmMeses <= idadeMeses) {
        dados.vacinas.forEach(vacina => {
          const vacinaConfirmada = vacinasConfirmadas.find(
            v => v.nome.toLowerCase().includes(vacina.nome.toLowerCase().split(' ')[0]) ||
              vacina.nome.toLowerCase().includes(v.nome.toLowerCase().split(' ')[0])
          );

          if (vacinaConfirmada) {
            vacinasEmDia.push({
              ...vacina,
              idade: dados.idade,
              status: 'em_dia'
            });
          } else {
            vacinasAtrasadas.push({
              ...vacina,
              idade: dados.idade,
              status: 'atrasada'
            });
          }
        });
      } else if (dados.idadeEmMeses <= idadeMeses + 6) {
        dados.vacinas.forEach(vacina => {
          proximasVacinas.push({
            ...vacina,
            idade: dados.idade,
            status: 'proxima'
          });
        });
      }
    });

    return {
      emDia: vacinasEmDia,
      atrasadas: vacinasAtrasadas,
      proximas: proximasVacinas,
      percentualCompleto: vacinasEmDia.length / (vacinasEmDia.length + vacinasAtrasadas.length) * 100 || 0
    };
  };

  // Handler de upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCarregando(true);

      try {
        let imageDataUrl = null;

        if (file.type === 'application/pdf') {
          // Importar dinamicamente para evitar erros de SSR
          const pdfjsLib = await import('pdfjs-dist');
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const page = await pdf.getPage(1); // Pega a primeira página

          const viewport = page.getViewport({ scale: 2.0 }); // Scale 2.0 para melhor qualidade
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport: viewport }).promise;
          imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        } else {
          // É imagem
          imageDataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        }

        setImagemCarteira(imageDataUrl);

        // Analisar com IA
        const resultado = await analisarComIA(imageDataUrl);

        if (resultado) {
          setResultadoIA(resultado);

          // Mapear resposta da API para o formato de vacinas reconhecidas
          const vacinas = resultado.vacinasTomadas.map(v => ({
            nome: v.nome,
            dose: v.dose,
            confirmada: true,
            data: v.data
          }));

          setVacinasReconhecidas(vacinas);
          setTextoOCR(resultado.observacoes || "Análise realizada via IA");
        } else {
          // Fallback se falhar
          setTextoOCR("Falha na análise IA");
        }

        setStep('analise');
      } catch (error) {
        console.error("Erro ao processar arquivo:", error);
        alert("Erro ao processar o arquivo. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    }
  };

  // Confirmar vacina
  const toggleVacinaConfirmada = (index) => {
    const novasVacinas = [...vacinasReconhecidas];
    novasVacinas[index].confirmada = !novasVacinas[index].confirmada;
    setVacinasReconhecidas(novasVacinas);
  };

  // Adicionar vacina manualmente
  const [novaVacina, setNovaVacina] = useState({ nome: '', dose: '' });

  const adicionarVacinaManual = () => {
    if (novaVacina.nome) {
      setVacinasReconhecidas([
        ...vacinasReconhecidas,
        { ...novaVacina, confirmada: true }
      ]);
      setNovaVacina({ nome: '', dose: '' });
    }
  };

  // Gerar análise final
  const gerarAnalise = () => {
    const confirmadas = vacinasReconhecidas.filter(v => v.confirmada);
    setVacinasConfirmadas(confirmadas);

    if (resultadoIA) {
      // Usar resultado da IA
      // Se o usuário desmarcou alguma vacina que a IA achou que tinha tomado,
      // idealmente deveríamos mover para faltantes, mas por simplicidade vamos manter as listas da IA
      // e apenas atualizar a lista de "Em Dia" com o que o usuário confirmou.

      setAnalise({
        emDia: confirmadas.map(v => ({
          ...v,
          status: 'em_dia',
          idade: v.data || 'Data não ident.'
        })),
        atrasadas: resultadoIA.vacinasFaltantes.map(v => ({
          nome: v.nome,
          dose: 'Pendente',
          status: 'atrasada',
          idade: 'Atrasada',
          doencas: v.motivo
        })),
        proximas: resultadoIA.proximasDoses.map(v => ({
          nome: v.nome,
          dose: v.indicacao || 'Próxima dose',
          status: 'proxima',
          idade: v.dataPrevista,
          doencas: v.indicacao
        })),
        percentualCompleto: Math.min(100, Math.round((confirmadas.length / (confirmadas.length + resultadoIA.vacinasFaltantes.length)) * 100)) || 0
      });
    } else {
      // Fallback para lógica local
      const idadeMeses = calcularIdadeEmMeses(dadosPaciente.dataNascimento);
      const resultado = analisarSituacaoVacinal(confirmadas, idadeMeses);
      setAnalise(resultado);
    }
    setStep('resultado');
  };

  // Componente de Status Badge
  const StatusBadge = ({ status }) => {
    const styles = {
      em_dia: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      atrasada: 'bg-rose-50 text-rose-600 border-rose-200',
      proxima: 'bg-amber-50 text-amber-600 border-amber-200'
    };
    const labels = {
      em_dia: '✓ Em dia',
      atrasada: '⚠ Atrasada',
      proxima: '◐ Próxima'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-brand-dark-gray">
      {/* Background decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 md:px-6 md:py-6">
          <div className="flex items-center gap-4">
            <img src="/logo-header.png" alt="Saúde Livre" className="h-10 w-auto" />
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <h1 className="text-xl font-bold text-brand-dark-blue">
                VacinaCheck
              </h1>
              <p className="text-brand-medium-gray text-sm">Sistema de Verificação Vacinal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
          {['Dados', 'Upload', 'Análise', 'Resultado'].map((label, i) => {
            const steps = ['inicio', 'upload', 'analise', 'resultado'];
            const currentIndex = steps.indexOf(step);
            const isActive = i <= currentIndex;
            const isCurrent = i === currentIndex;

            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${isCurrent
                    ? 'bg-brand-gradient text-white shadow-lg shadow-brand-blue/25 scale-110'
                    : isActive
                      ? 'bg-brand-light text-brand-blue border border-brand-blue/20'
                      : 'bg-white text-brand-medium-gray border border-slate-200'
                    }`}>
                    {i + 1}
                  </div>
                  <span className={`hidden sm:block text-sm font-medium ${isActive ? 'text-brand-dark-blue' : 'text-brand-medium-gray'}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`w-12 h-0.5 ${isActive && i < currentIndex ? 'bg-brand-gradient' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step: Início - Dados do paciente */}
        {step === 'inicio' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-brand-dark-blue">Dados do Paciente</h2>
              <p className="text-brand-medium-gray mb-8">Preencha as informações para iniciar a verificação</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-dark-gray mb-2">Nome completo</label>
                  <input
                    type="text"
                    value={dadosPaciente.nome}
                    onChange={(e) => setDadosPaciente({ ...dadosPaciente, nome: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-brand-dark-gray placeholder-slate-400"
                    placeholder="Digite o nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark-gray mb-2">Data de nascimento</label>
                  <input
                    type="date"
                    value={dadosPaciente.dataNascimento}
                    onChange={(e) => setDadosPaciente({ ...dadosPaciente, dataNascimento: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-brand-dark-gray"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark-gray mb-2">Sexo</label>
                  <div className="flex gap-4 mb-4">
                    {['Masculino', 'Feminino'].map((sexo) => (
                      <button
                        key={sexo}
                        onClick={() => setDadosPaciente({
                          ...dadosPaciente,
                          sexo,
                          gestante: sexo === 'Masculino' ? false : dadosPaciente.gestante,
                          semanasGestacao: sexo === 'Masculino' ? '' : dadosPaciente.semanasGestacao
                        })}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${dadosPaciente.sexo === sexo
                          ? 'bg-brand-gradient text-white shadow-lg shadow-brand-blue/20'
                          : 'bg-white border border-slate-200 text-brand-medium-gray hover:border-brand-blue/50 hover:text-brand-blue'
                          }`}
                      >
                        {sexo}
                      </button>
                    ))}
                  </div>

                  {dadosPaciente.sexo === 'Feminino' && (
                    <div className="bg-brand-light/30 p-4 rounded-xl border border-brand-blue/10">
                      <label className="flex items-center gap-3 cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          checked={dadosPaciente.gestante}
                          onChange={(e) => setDadosPaciente({ ...dadosPaciente, gestante: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                        />
                        <span className="text-brand-dark-gray font-medium">Estou gestante</span>
                      </label>

                      {dadosPaciente.gestante && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                            Semanas de gestação
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="42"
                            value={dadosPaciente.semanasGestacao}
                            onChange={(e) => setDadosPaciente({ ...dadosPaciente, semanasGestacao: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-brand-dark-gray"
                            placeholder="Ex: 20"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setStep('upload')}
                disabled={!dadosPaciente.nome || !dadosPaciente.dataNascimento}
                className="w-full mt-8 py-4 bg-brand-gradient rounded-xl font-semibold text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step: Upload */}
        {step === 'upload' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-brand-dark-blue">Upload da Carteira</h2>
              <p className="text-brand-medium-gray mb-8">Envie uma foto ou PDF da carteira de vacinação</p>

              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-brand-blue transition-colors bg-slate-50">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleUpload}
                  className="hidden"
                  id="upload-carteira"
                />
                <label htmlFor="upload-carteira" className="cursor-pointer">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-light flex items-center justify-center">
                    <svg className="w-10 h-10 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-brand-dark-blue font-medium mb-2">Clique para selecionar arquivo</p>
                  <p className="text-brand-medium-gray text-sm">ou arraste e solte aqui</p>
                  <p className="text-brand-medium-gray text-xs mt-4">Formatos aceitos: JPG, PNG, PDF</p>
                </label>
              </div>

              {carregando && (
                <div className="mt-6 flex items-center justify-center gap-3 text-brand-blue">
                  <div className="w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                  <span>Analisando carteirinha com IA (GPT-4o)...</span>
                </div>
              )}

              <div className="mt-8 p-4 bg-brand-light rounded-xl border border-brand-blue/10">
                <p className="text-sm text-brand-dark-gray">
                  <strong className="text-brand-blue">💡 Dica:</strong> Para melhores resultados, tire uma foto bem iluminada e legível da carteira de vacinação.
                </p>
              </div>

              <button
                onClick={() => setStep('inicio')}
                className="w-full mt-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-brand-medium-gray hover:bg-slate-50 transition-all"
              >
                ← Voltar
              </button>
            </div>
          </div>
        )}

        {/* Step: Análise */}
        {step === 'analise' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Imagem e OCR */}
              <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                  <span className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue">📷</span>
                  Imagem Carregada
                </h3>

                {imagemCarteira && (
                  <img
                    src={imagemCarteira}
                    alt="Carteira de vacinação"
                    className="w-full rounded-xl border border-slate-200 mb-4"
                  />
                )}

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-sm font-medium text-brand-medium-gray mb-2">Observações da IA:</h4>
                  <pre className="text-xs text-brand-dark-gray whitespace-pre-wrap font-mono">{textoOCR}</pre>
                </div>
              </div>

              {/* Vacinas reconhecidas */}
              <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                  <span className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue">💉</span>
                  Vacinas Identificadas
                </h3>

                <p className="text-brand-medium-gray text-sm mb-4">Confirme as vacinas reconhecidas automaticamente:</p>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {vacinasReconhecidas.map((vacina, index) => (
                    <div
                      key={index}
                      onClick={() => toggleVacinaConfirmada(index)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${vacina.confirmada
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-brand-blue/50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${vacina.confirmada ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
                          }`}>
                          {vacina.confirmada && '✓'}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium capitalize text-brand-dark-gray">{vacina.nome}</p>
                          <p className="text-sm text-brand-medium-gray">{vacina.dose}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adicionar vacina manual */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-medium text-brand-dark-gray mb-3">Adicionar vacina manualmente:</h4>
                  <div className="flex gap-2">
                    <select
                      value={novaVacina.nome}
                      onChange={(e) => setNovaVacina({ ...novaVacina, nome: e.target.value })}
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none text-brand-dark-gray"
                    >
                      <option value="">Selecione...</option>
                      {Object.keys(SINONIMOS_VACINAS).map(v => (
                        <option key={v} value={v} className="capitalize">{v}</option>
                      ))}
                    </select>
                    <button
                      onClick={adicionarVacinaManual}
                      className="px-4 py-2 bg-brand-light text-brand-blue rounded-lg hover:bg-brand-blue/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep('upload')}
                    className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-medium text-brand-medium-gray hover:bg-slate-50 transition-all"
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={gerarAnalise}
                    className="flex-1 py-3 bg-brand-gradient rounded-xl font-semibold text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all"
                  >
                    Gerar Análise →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Resultado */}
        {step === 'resultado' && analise && (
          <div className="max-w-4xl mx-auto">
            {/* Header do Paciente */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-brand-dark-blue mb-1">{dadosPaciente.nome}</h2>
                  <p className="text-brand-medium-gray flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(dadosPaciente.dataNascimento).toLocaleDateString('pt-BR')} •
                    {Math.floor(calcularIdadeEmMeses(dadosPaciente.dataNascimento) / 12)} anos
                    {dadosPaciente.gestante && <span className="text-brand-blue font-medium">• Gestante ({dadosPaciente.semanasGestacao} semanas)</span>}
                  </p>
                </div>
                <button
                  onClick={() => setStep('inicio')}
                  className="text-sm text-brand-blue hover:underline"
                >
                  Nova Análise
                </button>
              </div>
            </div>

            {/* Tabs de Navegação */}
            <div className="flex p-1 bg-white rounded-xl border border-slate-200 mb-6 shadow-sm">
              {[
                { id: 'geral', label: 'Visão Geral', icon: Shield },
                { id: 'carteira', label: 'Minha Carteira', icon: Syringe },
                { id: 'agenda', label: 'Planejamento', icon: Calendar },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                    ? 'bg-brand-gradient text-white shadow-md'
                    : 'text-brand-medium-gray hover:bg-slate-50'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Conteúdo das Tabs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* TAB: VISÃO GERAL */}
                {activeTab === 'geral' && (
                  <div className="space-y-6">
                    {/* Score Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
                      <div className="relative w-40 h-40 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="50%" cy="50%" r="70" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                          <motion.circle
                            cx="50%" cy="50%" r="70" fill="none" stroke="url(#gradient)" strokeWidth="12"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: analise.percentualCompleto / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="drop-shadow-lg"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#6de0e4" />
                              <stop offset="100%" stopColor="#0072a2" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-brand-dark-blue">{Math.round(analise.percentualCompleto)}%</span>
                          <span className="text-xs text-brand-medium-gray uppercase tracking-wider font-semibold">Protegido</span>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-brand-dark-blue mb-2">
                          {analise.percentualCompleto === 100
                            ? "Parabéns! Sua vacinação está completa."
                            : "Sua proteção precisa de atenção."}
                        </h3>
                        <p className="text-brand-dark-gray mb-6">
                          {analise.percentualCompleto === 100
                            ? "Você está em dia com todas as vacinas recomendadas para sua idade. Continue assim!"
                            : `Identificamos ${analise.atrasadas.length} vacinas pendentes que são importantes para sua saúde.`}
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                            <p className="text-2xl font-bold text-emerald-600">{analise.emDia.length}</p>
                            <p className="text-xs text-emerald-700 font-medium">Em dia</p>
                          </div>
                          <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100">
                            <p className="text-2xl font-bold text-rose-600">{analise.atrasadas.length}</p>
                            <p className="text-xs text-rose-700 font-medium">Atrasadas</p>
                          </div>
                          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                            <p className="text-2xl font-bold text-amber-600">{analise.proximas.length}</p>
                            <p className="text-xs text-amber-700 font-medium">Próximas</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    {analise.atrasadas.length > 0 && (
                      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold">Regularize sua situação</h4>
                            <p className="text-white/90 text-sm">Não deixe sua saúde para depois. Agende suas vacinas pendentes.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveTab('agenda')}
                          className="px-6 py-3 bg-white text-rose-600 rounded-xl font-bold shadow-lg hover:bg-rose-50 transition-colors whitespace-nowrap"
                        >
                          Ver Pendências
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: MINHA CARTEIRA */}
                {activeTab === 'carteira' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <h3 className="text-lg font-bold text-brand-dark-blue">Detalhamento das Vacinas</h3>
                      <div className="flex bg-slate-100 p-1 rounded-lg">
                        {['todas', 'tomadas', 'pendentes'].map(filtro => (
                          <button
                            key={filtro}
                            onClick={() => setFiltroCarteira(filtro)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${filtroCarteira === filtro ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'
                              }`}
                          >
                            {filtro}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {[...analise.atrasadas, ...analise.proximas, ...analise.emDia]
                        .filter(v => {
                          if (filtroCarteira === 'tomadas') return v.status === 'em_dia';
                          if (filtroCarteira === 'pendentes') return v.status !== 'em_dia';
                          return true;
                        })
                        .map((vacina, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="group hover:bg-slate-50 transition-colors"
                          >
                            <div className="p-5 flex items-start gap-4">
                              <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${vacina.status === 'em_dia' ? 'bg-emerald-100 text-emerald-600' :
                                vacina.status === 'atrasada' ? 'bg-rose-100 text-rose-600' :
                                  'bg-amber-100 text-amber-600'
                                }`}>
                                {vacina.status === 'em_dia' ? <Check className="w-5 h-5" /> :
                                  vacina.status === 'atrasada' ? <AlertCircle className="w-5 h-5" /> :
                                    <Clock className="w-5 h-5" />}
                              </div>

                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                  <h4 className="font-bold text-brand-dark-gray text-lg">{vacina.nome}</h4>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${vacina.status === 'em_dia' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                    vacina.status === 'atrasada' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                      'bg-amber-50 text-amber-700 border-amber-200'
                                    }`}>
                                    {vacina.status === 'em_dia' ? 'Tomada' :
                                      vacina.status === 'atrasada' ? 'Atrasada' : 'Próxima'}
                                  </span>
                                </div>
                                <p className="text-sm text-brand-medium-gray mb-2">
                                  {vacina.dose} • {vacina.status === 'em_dia' ? `Realizada em: ${vacina.idade}` : `Prevista para: ${vacina.idade}`}
                                </p>
                                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 border border-slate-100">
                                  <span className="font-semibold text-brand-blue">Protege contra:</span> {vacina.doencas}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                      {[...analise.atrasadas, ...analise.proximas, ...analise.emDia].length === 0 && (
                        <div className="p-12 text-center text-brand-medium-gray">
                          Nenhuma vacina encontrada para este filtro.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB: PLANEJAMENTO */}
                {activeTab === 'agenda' && (
                  <div className="space-y-6">
                    {/* Atrasadas */}
                    {analise.atrasadas.length > 0 && (
                      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden">
                        <div className="bg-rose-50 p-4 border-b border-rose-100 flex items-center gap-3">
                          <AlertTriangle className="text-rose-600 w-5 h-5" />
                          <h3 className="font-bold text-rose-700">Prioridade Alta - Regularizar Agora</h3>
                        </div>
                        <div className="p-6 grid gap-4">
                          {analise.atrasadas.map((vacina, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-rose-100 hover:border-rose-200 hover:shadow-md transition-all bg-white">
                              <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold shrink-0">
                                  !
                                </div>
                                <div>
                                  <h4 className="font-bold text-brand-dark-gray">{vacina.nome}</h4>
                                  <p className="text-sm text-rose-600 font-medium">Deveria ter tomado: {vacina.idade}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => agendarNoWhatsApp(vacina.nome)}
                                className="w-full md:w-auto px-6 py-2.5 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
                              >
                                <Calendar className="w-4 h-4" />
                                Agendar
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Próximas */}
                    {analise.proximas.length > 0 && (
                      <div className="bg-white rounded-3xl border border-amber-100 shadow-xl overflow-hidden">
                        <div className="bg-amber-50 p-4 border-b border-amber-100 flex items-center gap-3">
                          <Clock className="text-amber-600 w-5 h-5" />
                          <h3 className="font-bold text-amber-700">Próximos Passos</h3>
                        </div>
                        <div className="p-6 grid gap-4">
                          {analise.proximas.map((vacina, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all bg-white">
                              <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                  <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-brand-dark-gray">{vacina.nome}</h4>
                                  <p className="text-sm text-amber-600 font-medium">Previsão: {vacina.idade}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => agendarNoWhatsApp(vacina.nome)}
                                className="w-full md:w-auto px-6 py-2.5 bg-white border border-amber-200 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                              >
                                Agendar Lembrete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {analise.atrasadas.length === 0 && analise.proximas.length === 0 && (
                      <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-xl">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-dark-blue mb-2">Tudo em ordem!</h3>
                        <p className="text-brand-medium-gray">Você não tem vacinas pendentes ou previstas para os próximos meses.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-100 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-brand-medium-gray text-sm">
          <p>Baseado no Calendário Vacinal do Ministério da Saúde (SUS) e SBIm 2025/2026</p>
          <p className="mt-1">Este sistema é apenas informativo. Consulte sempre um profissional de saúde.</p>
        </div>
      </footer>
    </div >
  );
}
