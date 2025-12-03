'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Syringe, Shield, Baby, User, Heart, Briefcase, Plane, ChevronRight, ArrowLeft, MessageCircle } from 'lucide-react';

const VACINAS = [
    // Vacinas
    {
        id: 'bcg',
        nome: 'BCG',
        descricao: 'Previne as formas graves de tuberculose, principalmente miliar e meníngea.',
        indicacao: 'Ao nascer',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'hepatite-b',
        nome: 'Hepatite B',
        descricao: 'Previne a infecção pelo vírus da hepatite B.',
        indicacao: 'Ao nascer, 2, 4 e 6 meses',
        categoria: 'Todos',
        icon: Shield
    },
    {
        id: 'penta',
        nome: 'Pentavalente',
        descricao: 'Protege contra difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae tipo b.',
        indicacao: '2, 4 e 6 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'hexa',
        nome: 'Hexavalente',
        descricao: 'Protege contra difteria, tétano, coqueluche, hepatite B, poliomielite e Haemophilus influenzae tipo b.',
        indicacao: '2 e 6 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'vip',
        nome: 'Poliomielite (VIP)',
        descricao: 'Previne a paralisia infantil (poliomielite).',
        indicacao: '2, 4 e 6 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'pneumo-10',
        nome: 'Pneumocócica 10',
        descricao: 'Previne doenças invasivas e otite média aguda causadas por Streptococcus pneumoniae.',
        indicacao: '2, 4 e 12 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'pneumo-13',
        nome: 'Pneumocócica 13',
        descricao: 'Proteção ampliada contra 13 sorotipos de pneumococos.',
        indicacao: 'A partir de 2 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'pneumo-15',
        nome: 'Pneumocócica 15',
        descricao: 'Proteção ampliada contra 15 sorotipos de pneumococos.',
        indicacao: 'A partir de 2 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'pneumo-20',
        nome: 'Pneumocócica 20',
        descricao: 'Proteção mais ampla disponível contra pneumococos.',
        indicacao: 'Adultos',
        categoria: 'Adultos',
        icon: User
    },
    {
        id: 'rotavirus',
        nome: 'Rotavírus',
        descricao: 'Previne diarreia grave causada por rotavírus.',
        indicacao: '2 e 4 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'meningo-c',
        nome: 'Meningocócica C',
        descricao: 'Previne doença meningocócica causada pelo sorogrupo C.',
        indicacao: '3, 5 e 12 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'meningo-acwy',
        nome: 'Meningocócica ACWY',
        descricao: 'Previne meningite e infecções generalizadas causadas pelos meningococos A, C, W e Y.',
        indicacao: '3, 5, 12 meses e adolescentes',
        categoria: 'Todos',
        icon: Baby
    },
    {
        id: 'meningo-b',
        nome: 'Meningocócica B',
        descricao: 'Previne meningite e infecções generalizadas causadas pelo meningococo B.',
        indicacao: '3, 5 e 12 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'febre-amarela',
        nome: 'Febre Amarela',
        descricao: 'Previne a febre amarela.',
        indicacao: '9 meses e 4 anos',
        categoria: 'Todos',
        icon: Plane
    },
    {
        id: 'triplice-viral',
        nome: 'Tríplice Viral',
        descricao: 'Previne sarampo, caxumba e rubéola.',
        indicacao: '12 meses',
        categoria: 'Todos',
        icon: Shield
    },
    {
        id: 'tetraviral',
        nome: 'Tetraviral',
        descricao: 'Previne sarampo, caxumba, rubéola e varicela.',
        indicacao: '15 meses',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'varicela',
        nome: 'Varicela',
        descricao: 'Previne a varicela (catapora).',
        indicacao: '15 meses e 4 anos',
        categoria: 'Crianças',
        icon: Baby
    },
    {
        id: 'hepatite-a',
        nome: 'Hepatite A',
        descricao: 'Previne a infecção pelo vírus da hepatite A.',
        indicacao: '15 meses',
        categoria: 'Crianças',
        icon: Baby
    },
    {
        id: 'dtpa',
        nome: 'dTpa',
        descricao: 'Previne difteria, tétano e coqueluche. Essencial para gestantes.',
        indicacao: 'Gestantes a partir de 20 semanas',
        categoria: 'Gestantes',
        icon: Heart
    },
    {
        id: 'dtpa-ipv',
        nome: 'dTpa + IPV',
        descricao: 'Previne difteria, tétano, coqueluche e poliomielite.',
        indicacao: 'Reforço',
        categoria: 'Crianças',
        icon: Shield
    },
    {
        id: 'influenza',
        nome: 'Influenza (Gripe) Tetravalente',
        descricao: 'Previne a gripe e suas complicações. Cepas atualizadas.',
        indicacao: 'Anual',
        categoria: 'Todos',
        icon: Shield
    },
    {
        id: 'efluelda',
        nome: 'Efluelda (Gripe Alta Dose)',
        descricao: 'Vacina da gripe com alta dose de antígeno, ideal para idosos.',
        indicacao: '60+ anos',
        categoria: 'Adultos',
        icon: User
    },
    {
        id: 'hpv-4',
        nome: 'HPV Quadrivalente',
        descricao: 'Previne infecções pelo papilomavírus humano (4 tipos).',
        indicacao: '9 a 45 anos',
        categoria: 'Adolescentes',
        icon: User
    },
    {
        id: 'hpv-9',
        nome: 'HPV Nonavalente',
        descricao: 'Proteção ampliada contra 9 tipos de HPV.',
        indicacao: '9 a 45 anos',
        categoria: 'Adolescentes',
        icon: User
    },
    {
        id: 'herpes-zoster',
        nome: 'Herpes Zóster (Shingrix)',
        descricao: 'Previne o herpes zóster (cobreiro) e neuralgia pós-herpética.',
        indicacao: '50+ anos',
        categoria: 'Adultos',
        icon: User
    },
    {
        id: 'dengue',
        nome: 'Dengue (Qdenga)',
        descricao: 'Previne a dengue causada pelos quatro sorotipos do vírus.',
        indicacao: '4 a 60 anos',
        categoria: 'Todos',
        icon: Shield
    },
    {
        id: 'febre-tifoide',
        nome: 'Febre Tifoide',
        descricao: 'Previne a febre tifoide.',
        indicacao: 'Viajantes',
        categoria: 'Todos',
        icon: Plane
    },
    {
        id: 'vsr-arexvy',
        nome: 'VSR (Arexvy)',
        descricao: 'Vacina contra Vírus Sincicial Respiratório para idosos.',
        indicacao: '60+ anos',
        categoria: 'Adultos',
        icon: User
    },
    {
        id: 'vsr-abrysvo',
        nome: 'VSR (Abrysvo)',
        descricao: 'Vacina contra VSR para gestantes e idosos.',
        indicacao: 'Gestantes e 60+',
        categoria: 'Gestantes',
        icon: Heart
    },
    {
        id: 'beyfortus',
        nome: 'Beyfortus (Imunização VSR)',
        descricao: 'Anticorpo monoclonal para prevenção de VSR em bebês.',
        indicacao: 'Recém-nascidos',
        categoria: 'Bebês',
        icon: Baby
    },
    {
        id: 'rhophylac',
        nome: 'Rhophylac',
        descricao: 'Imunoglobulina anti-D para gestantes Rh negativo.',
        indicacao: 'Gestantes',
        categoria: 'Gestantes',
        icon: Heart
    },

    // Serviços
    {
        id: 'furo-orelha',
        nome: 'Perfuração de Orelha',
        descricao: 'Colocação de brincos com técnica humanizada e estéril.',
        indicacao: 'Todas as idades',
        categoria: 'Serviços',
        icon: Heart
    },
    {
        id: 'aplicacao-brinco',
        nome: 'Aplicação de Brinco',
        descricao: 'Procedimento completo de aplicação.',
        indicacao: 'Todas as idades',
        categoria: 'Serviços',
        icon: Heart
    },
    {
        id: 'home-care',
        nome: 'Home Care',
        descricao: 'Atendimento domiciliar para vacinação e procedimentos.',
        indicacao: 'Sob agendamento',
        categoria: 'Serviços',
        icon: Briefcase
    },
    {
        id: 'laserterapia',
        nome: 'Laserterapia',
        descricao: 'Tratamento com laser para feridas e inflamações.',
        indicacao: 'Sob avaliação',
        categoria: 'Serviços',
        icon: Syringe
    },
    {
        id: 'soroterapia',
        nome: 'Soroterapia',
        descricao: 'Administração de soro e medicamentos endovenosos.',
        indicacao: 'Sob prescrição',
        categoria: 'Serviços',
        icon: Syringe
    },

    // Injetáveis
    {
        id: 'aplicacao-injetaveis',
        nome: 'Aplicação de Injetáveis',
        descricao: 'Aplicação de medicamentos prescritos (IM/SC).',
        indicacao: 'Com receita',
        categoria: 'Injetáveis',
        icon: Syringe
    },
    {
        id: 'aplicacao-vitaminas',
        nome: 'Aplicação de Vitaminas',
        descricao: 'Reposição vitamínica injetável.',
        indicacao: 'Sob prescrição',
        categoria: 'Injetáveis',
        icon: Syringe
    },

    // Exames
    {
        id: 'teste-pezinho',
        nome: 'Teste do Pezinho',
        descricao: 'Triagem neonatal para diversas doenças.',
        indicacao: 'Recém-nascidos',
        categoria: 'Exames',
        icon: Baby
    },
    {
        id: 'teste-covid',
        nome: 'Teste Covid-19',
        descricao: 'Teste rápido de antígeno para Covid-19.',
        indicacao: 'Sintomáticos',
        categoria: 'Exames',
        icon: Shield
    },
    {
        id: 'perfil-lipidico',
        nome: 'Perfil Lipídico',
        descricao: 'Exame para avaliação de colesterol e triglicerídeos.',
        indicacao: 'Jejum necessário',
        categoria: 'Exames',
        icon: Shield
    },
    {
        id: 'funcao-renal',
        nome: 'Função Renal',
        descricao: 'Avaliação da saúde dos rins.',
        indicacao: 'Todos',
        categoria: 'Exames',
        icon: Shield
    },
    {
        id: 'hemoglobina-glicada',
        nome: 'Hemoglobina Glicada',
        descricao: 'Controle de diabetes e glicemia.',
        indicacao: 'Todos',
        categoria: 'Exames',
        icon: Shield
    },
    {
        id: 'beta-hcg',
        nome: 'Beta HCG',
        descricao: 'Teste de gravidez sanguíneo.',
        indicacao: 'Suspeita de gravidez',
        categoria: 'Exames',
        icon: Heart
    },
    {
        id: 'exame-dengue',
        nome: 'Exame Dengue (NS1 / IgG IgM)',
        descricao: 'Diagnóstico rápido de Dengue.',
        indicacao: 'Sintomáticos',
        categoria: 'Exames',
        icon: Shield
    },

    // Produtos
    {
        id: 'pikluc',
        nome: 'Pikluc',
        descricao: 'Aparelho para alívio da dor na injeção.',
        indicacao: 'Uso local',
        categoria: 'Produtos',
        icon: Baby
    },
    {
        id: 'buzzy',
        nome: 'Fever Friends',
        descricao: 'Compressas adesivas para alívio da febre.',
        indicacao: 'Uso local',
        categoria: 'Produtos',
        icon: Baby
    },
    {
        id: 'xua',
        nome: 'Xuá Irrigador Nasal',
        descricao: 'Dispositivo para lavagem nasal.',
        indicacao: 'Uso nasal',
        categoria: 'Produtos',
        icon: Baby
    },
    {
        id: 'brinco',
        nome: 'Brinco Estéril',
        descricao: 'Par de brincos estéreis para perfuração.',
        indicacao: 'Uso auricular',
        categoria: 'Produtos',
        icon: Heart
    }
];

const CATEGORIAS = [
    { id: 'Todos', label: 'Todas', icon: Shield },
    { id: 'Bebês', label: 'Bebês e Crianças', icon: Baby },
    { id: 'Adolescentes', label: 'Adolescentes', icon: User },
    { id: 'Adultos', label: 'Adultos e Idosos', icon: Briefcase },
    { id: 'Gestantes', label: 'Gestantes', icon: Heart },
    { id: 'Serviços', label: 'Serviços', icon: Heart },
    { id: 'Injetáveis', label: 'Injetáveis', icon: Syringe },
    { id: 'Exames', label: 'Exames', icon: Shield },
    { id: 'Produtos', label: 'Produtos', icon: Briefcase },
];

export default function VacinasPage() {
    const [filtro, setFiltro] = useState('Todos');
    const [busca, setBusca] = useState('');

    const vacinasFiltradas = VACINAS.filter(vacina => {
        const matchCategoria = filtro === 'Todos' || vacina.categoria === filtro || (filtro === 'Bebês' && vacina.categoria === 'Crianças');
        const matchBusca = vacina.nome.toLowerCase().includes(busca.toLowerCase()) ||
            vacina.descricao.toLowerCase().includes(busca.toLowerCase());
        return matchCategoria && matchBusca;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-brand-dark-gray selection:bg-brand-cyan/20">
            {/* Header */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="w-5 h-5 text-brand-medium-gray group-hover:text-brand-blue transition-colors" />
                        <span className="text-sm font-medium text-brand-medium-gray group-hover:text-brand-blue transition-colors">Voltar ao início</span>
                    </a>
                    <div className="flex items-center gap-2">
                        <img src="/logo-header.png" alt="Saúde Livre" className="h-6 md:h-8 w-auto" />
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <span className="inline-block py-2 px-4 rounded-full bg-brand-light text-brand-medium-blue text-sm font-bold tracking-wide mb-4 uppercase">
                            Catálogo de Imunização e Serviços
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-4">
                            Conheça nossas <span className="text-brand-blue">Vacinas e Serviços</span>
                        </h1>
                        <p className="text-lg text-brand-dark-gray max-w-2xl mx-auto">
                            Proteção completa para todas as fases da vida. Descubra as vacinas disponíveis em nossa unidade.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-12 space-y-6">
                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-medium-gray w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar vacina ou doença..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-brand-dark-gray"
                            />
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {CATEGORIAS.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFiltro(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${filtro === cat.id
                                        ? 'bg-brand-dark-blue text-white shadow-lg shadow-brand-blue/20'
                                        : 'bg-white text-brand-medium-gray border border-slate-200 hover:border-brand-blue/50'
                                        }`}
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid de Vacinas */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {vacinasFiltradas.map((vacina) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={vacina.id}
                                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-lg hover:shadow-xl transition-all group"
                            >
                                <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-blue mb-4 group-hover:scale-110 transition-transform">
                                    <vacina.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark-blue mb-2">{vacina.nome}</h3>
                                <p className="text-brand-medium-gray text-sm mb-4 line-clamp-2">
                                    {vacina.descricao}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-brand-blue bg-brand-light px-3 py-1 rounded-full w-fit mb-1">
                                            {vacina.indicacao}
                                        </span>
                                    </div>
                                    <a
                                        href={`https://wa.me/5548991895758?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre a vacina ${vacina.nome}.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-colors"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {vacinasFiltradas.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-brand-medium-gray text-lg">Nenhuma vacina encontrada para sua busca.</p>
                            <button
                                onClick={() => { setBusca(''); setFiltro('Todos'); }}
                                className="mt-4 text-brand-blue font-medium hover:underline"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-brand-medium-gray text-sm bg-white border-t border-slate-100 flex flex-col items-center gap-4">
                <img src="/logo-header.png" alt="Saúde Livre" className="h-6 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" />
                <p>© 2025 Saúde Livre Vacinas. Florianópolis Centro.</p>
            </footer>
        </div>
    );
}
