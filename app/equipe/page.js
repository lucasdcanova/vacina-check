'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Award, Shield, Stethoscope, GraduationCap, Star } from 'lucide-react';

export default function EquipePage() {
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
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <span className="inline-block py-2 px-4 rounded-full bg-brand-light text-brand-medium-blue text-sm font-bold tracking-wide mb-4 uppercase">
                            Quem cuida de você
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-6">
                            Conheça nossa <span className="text-brand-blue">Equipe Técnica</span>
                        </h1>
                        <p className="text-lg text-brand-dark-gray max-w-2xl mx-auto leading-relaxed">
                            Excelência técnica aliada ao calor humano. Nossa equipe é liderada por profissionais apaixonados pelo cuidado e pela vida.
                        </p>
                    </div>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
                    >
                        <div className="grid md:grid-cols-12 gap-0">
                            {/* Photo Section */}
                            <div className="md:col-span-5 bg-brand-light/30 relative min-h-[400px] md:min-h-full flex items-center justify-center p-8">
                                {/* Placeholder for Photo */}
                                <div className="w-64 h-64 rounded-full bg-brand-blue/10 border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-blue/40 group-hover:text-brand-blue/60 transition-colors">
                                        <Heart className="w-16 h-16 mb-2" />
                                        <span className="text-sm font-medium uppercase tracking-wider">Foto da Millena</span>
                                    </div>
                                    {/* Uncomment below when photo is available */}
                                    {/* <img src="/equipe/millena.jpg" alt="Millena Ollermann" className="w-full h-full object-cover" /> */}
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4 w-20 h-20 bg-brand-cyan/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-4 right-4 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl" />
                            </div>

                            {/* Content Section */}
                            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-brand-dark-blue mb-2">Millena Ollermann</h2>
                                    <p className="text-brand-blue font-medium text-lg flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        Enfermeira Responsável Técnica
                                    </p>
                                    <p className="text-brand-medium-gray text-sm mt-1">Coren-SC 852967</p>
                                </div>

                                <div className="space-y-6 text-brand-dark-gray leading-relaxed">
                                    <p>
                                        Com uma trajetória marcada pela dedicação ao próximo, Millena lidera nossa equipe com um olhar voltado para o <strong>atendimento humanizado</strong> e a segurança do paciente.
                                    </p>

                                    <p>
                                        Sua experiência vai além da técnica: atua também como <strong>Bombeira Comunitária</strong>, demonstrando na prática seu compromisso com a vida e o bem-estar da comunidade. Essa vivência em situações de urgência e emergência traz para a clínica um padrão elevado de segurança e preparação.
                                    </p>

                                    <div className="bg-brand-light/50 rounded-xl p-6 border border-brand-blue/10 mt-6">
                                        <h3 className="font-bold text-brand-dark-blue mb-4 flex items-center gap-2">
                                            <Star className="w-5 h-5 text-brand-blue" />
                                            Diferenciais e Formação
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <Shield className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Especialista em Urgência e Emergência</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <GraduationCap className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Pós-graduanda em UTI e Saúde da Família</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Heart className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Foco em técnicas de alívio da dor e vacinação humanizada</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Stethoscope className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Experiência em gestão de qualidade e segurança do paciente</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Values Section */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        {[
                            {
                                title: "Cuidado Humanizado",
                                desc: "Cada paciente é único. Respeitamos seu tempo, suas dores e sua história.",
                                icon: Heart
                            },
                            {
                                title: "Segurança Técnica",
                                desc: "Protocolos rigorosos baseados nas melhores práticas de imunização.",
                                icon: Shield
                            },
                            {
                                title: "Acolhimento",
                                desc: "Um ambiente preparado para receber você e sua família com carinho.",
                                icon: Star
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center"
                            >
                                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-brand-blue mx-auto mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-brand-dark-blue mb-2">{item.title}</h3>
                                <p className="text-sm text-brand-medium-gray">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
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
