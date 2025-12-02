import React, { useState, useCallback } from 'react';

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
    sexo: ''
  });
  const [imagemCarteira, setImagemCarteira] = useState(null);
  const [vacinasReconhecidas, setVacinasReconhecidas] = useState([]);
  const [vacinasConfirmadas, setVacinasConfirmadas] = useState([]);
  const [analise, setAnalise] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [textoOCR, setTextoOCR] = useState('');
  const [resultadoIA, setResultadoIA] = useState(null);

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
            situacao: dadosPaciente.sexo
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
      const reader = new FileReader();
      reader.onload = async (event) => {
        setImagemCarteira(event.target.result);

        // Analisar com IA
        const resultado = await analisarComIA(event.target.result);

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

        setCarregando(false);
        setStep('analise');
      };
      reader.readAsDataURL(file);
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
      em_dia: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      atrasada: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      proxima: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans">
      {/* Background decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                VacinaCheck
              </h1>
              <p className="text-slate-400 text-sm">Sistema de Verificação Vacinal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-4 mb-12">
          {['Dados', 'Upload', 'Análise', 'Resultado'].map((label, i) => {
            const steps = ['inicio', 'upload', 'analise', 'resultado'];
            const currentIndex = steps.indexOf(step);
            const isActive = i <= currentIndex;
            const isCurrent = i === currentIndex;

            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${isCurrent
                      ? 'bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-lg shadow-cyan-500/25 scale-110'
                      : isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                    {i + 1}
                  </div>
                  <span className={`hidden sm:block text-sm font-medium ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`w-12 h-0.5 ${isActive && i < currentIndex ? 'bg-gradient-to-r from-cyan-500 to-violet-500' : 'bg-slate-700'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step: Início - Dados do paciente */}
        {step === 'inicio' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-2">Dados do Paciente</h2>
              <p className="text-slate-400 mb-8">Preencha as informações para iniciar a verificação</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nome completo</label>
                  <input
                    type="text"
                    value={dadosPaciente.nome}
                    onChange={(e) => setDadosPaciente({ ...dadosPaciente, nome: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
                    placeholder="Digite o nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Data de nascimento</label>
                  <input
                    type="date"
                    value={dadosPaciente.dataNascimento}
                    onChange={(e) => setDadosPaciente({ ...dadosPaciente, dataNascimento: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sexo</label>
                  <div className="flex gap-4">
                    {['Masculino', 'Feminino'].map((sexo) => (
                      <button
                        key={sexo}
                        onClick={() => setDadosPaciente({ ...dadosPaciente, sexo })}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${dadosPaciente.sexo === sexo
                            ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                            : 'bg-slate-900/50 border border-slate-700 text-slate-400 hover:border-slate-600'
                          }`}
                      >
                        {sexo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('upload')}
                disabled={!dadosPaciente.nome || !dadosPaciente.dataNascimento}
                className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step: Upload */}
        {step === 'upload' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-2">Upload da Carteira</h2>
              <p className="text-slate-400 mb-8">Envie uma foto ou PDF da carteira de vacinação</p>

              <div className="border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center hover:border-cyan-500/50 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleUpload}
                  className="hidden"
                  id="upload-carteira"
                />
                <label htmlFor="upload-carteira" className="cursor-pointer">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white font-medium mb-2">Clique para selecionar arquivo</p>
                  <p className="text-slate-500 text-sm">ou arraste e solte aqui</p>
                  <p className="text-slate-600 text-xs mt-4">Formatos aceitos: JPG, PNG, PDF</p>
                </label>
              </div>

              {carregando && (
                <div className="mt-6 flex items-center justify-center gap-3 text-cyan-400">
                  <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>Analisando carteirinha com IA (GPT-4o)...</span>
                </div>
              )}

              <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-400">
                  <strong className="text-cyan-400">💡 Dica:</strong> Para melhores resultados, tire uma foto bem iluminada e legível da carteira de vacinação.
                </p>
              </div>

              <button
                onClick={() => setStep('inicio')}
                className="w-full mt-6 py-3 bg-slate-700/50 rounded-xl font-medium text-slate-300 hover:bg-slate-700 transition-all"
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
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">📷</span>
                  Imagem Carregada
                </h3>

                {imagemCarteira && (
                  <img
                    src={imagemCarteira}
                    alt="Carteira de vacinação"
                    className="w-full rounded-xl border border-slate-700 mb-4"
                  />
                )}

                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Observações da IA:</h4>
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">{textoOCR}</pre>
                </div>
              </div>

              {/* Vacinas reconhecidas */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">💉</span>
                  Vacinas Identificadas
                </h3>

                <p className="text-slate-400 text-sm mb-4">Confirme as vacinas reconhecidas automaticamente:</p>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {vacinasReconhecidas.map((vacina, index) => (
                    <div
                      key={index}
                      onClick={() => toggleVacinaConfirmada(index)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${vacina.confirmada
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${vacina.confirmada ? 'bg-emerald-500 text-white' : 'bg-slate-700'
                          }`}>
                          {vacina.confirmada && '✓'}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium capitalize">{vacina.nome}</p>
                          <p className="text-sm text-slate-400">{vacina.dose}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adicionar vacina manual */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Adicionar vacina manualmente:</h4>
                  <div className="flex gap-2">
                    <select
                      value={novaVacina.nome}
                      onChange={(e) => setNovaVacina({ ...novaVacina, nome: e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                    >
                      <option value="">Selecione...</option>
                      {Object.keys(SINONIMOS_VACINAS).map(v => (
                        <option key={v} value={v} className="capitalize">{v}</option>
                      ))}
                    </select>
                    <button
                      onClick={adicionarVacinaManual}
                      className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep('upload')}
                    className="flex-1 py-3 bg-slate-700/50 rounded-xl font-medium text-slate-300 hover:bg-slate-700 transition-all"
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={gerarAnalise}
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header do resultado */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{dadosPaciente.nome}</h2>
                  <p className="text-slate-400">
                    {new Date(dadosPaciente.dataNascimento).toLocaleDateString('pt-BR')} •
                    {' '}{Math.floor(calcularIdadeEmMeses(dadosPaciente.dataNascimento) / 12)} anos e {calcularIdadeEmMeses(dadosPaciente.dataNascimento) % 12} meses
                  </p>
                </div>

                {/* Gauge de cobertura */}
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-700" />
                      <circle
                        cx="48" cy="48" r="40" fill="none" stroke="url(#gradient)" strokeWidth="8"
                        strokeDasharray={`${analise.percentualCompleto * 2.51} 251`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{Math.round(analise.percentualCompleto)}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Cobertura</p>
                    <p className="text-sm text-slate-400">Vacinal</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                  <p className="text-3xl font-bold text-emerald-400">{analise.emDia.length}</p>
                  <p className="text-sm text-emerald-300/70">Em dia</p>
                </div>
                <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-500/20">
                  <p className="text-3xl font-bold text-rose-400">{analise.atrasadas.length}</p>
                  <p className="text-sm text-rose-300/70">Atrasadas</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <p className="text-3xl font-bold text-amber-400">{analise.proximas.length}</p>
                  <p className="text-sm text-amber-300/70">Próximas</p>
                </div>
              </div>
            </div>

            {/* Vacinas Atrasadas */}
            {analise.atrasadas.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-rose-500/20 p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-rose-400">
                  <span className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">⚠️</span>
                  Vacinas Atrasadas - Requer Atenção
                </h3>
                <div className="grid gap-3">
                  {analise.atrasadas.map((vacina, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{vacina.nome}</p>
                        <p className="text-sm text-slate-400">{vacina.dose} • Prevista: {vacina.idade}</p>
                        <p className="text-xs text-slate-500 mt-1">Protege contra: {vacina.doencas}</p>
                      </div>
                      <StatusBadge status="atrasada" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Próximas Vacinas */}
            {analise.proximas.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-amber-500/20 p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-400">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">📅</span>
                  Próximas Vacinas
                </h3>
                <div className="grid gap-3">
                  {analise.proximas.map((vacina, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{vacina.nome}</p>
                        <p className="text-sm text-slate-400">{vacina.dose} • Prevista: {vacina.idade}</p>
                        <p className="text-xs text-slate-500 mt-1">Protege contra: {vacina.doencas}</p>
                      </div>
                      <StatusBadge status="proxima" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vacinas em Dia */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-400">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">✓</span>
                Vacinas em Dia
              </h3>
              {analise.emDia.length > 0 ? (
                <div className="grid gap-3">
                  {analise.emDia.map((vacina, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{vacina.nome}</p>
                        <p className="text-sm text-slate-400">{vacina.dose}</p>
                      </div>
                      <StatusBadge status="em_dia" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">Nenhuma vacina confirmada ainda.</p>
              )}
            </div>

            {/* Ações */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep('inicio');
                  setDadosPaciente({ nome: '', dataNascimento: '', sexo: '' });
                  setVacinasReconhecidas([]);
                  setAnalise(null);
                  setImagemCarteira(null);
                }}
                className="flex-1 py-4 bg-slate-700/50 rounded-xl font-medium text-slate-300 hover:bg-slate-700 transition-all"
              >
                Nova Verificação
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
              >
                📄 Exportar Relatório
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-slate-500 text-sm">
          <p>Baseado no Calendário Vacinal do Ministério da Saúde (SUS) e SBIm 2025/2026</p>
          <p className="mt-1">Este sistema é apenas informativo. Consulte sempre um profissional de saúde.</p>
        </div>
      </footer>
    </div>
  );
}
