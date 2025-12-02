'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Shield, Check, X, Syringe, MessageCircle, Mail } from 'lucide-react';
import VacinaCheck from '@/components/VacinaCheck';

export default function LandingPage() {
  const [showChecker, setShowChecker] = useState(false);
  const [showMapMenu, setShowMapMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-brand-dark-gray selection:bg-brand-cyan/20">
      {/* Minimal Header */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-header.png" alt="Saúde Livre" className="h-8 md:h-10 w-auto" />
          </a>
          <a
            href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20vacina."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-blue hover:text-brand-dark-blue transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Agendar Vacina</span>
          </a>
        </div>
      </nav>

      {/* Clean Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <img src="/hero-logo.png?v=4" alt="Saúde Livre Logo" className="h-auto max-h-24 md:max-h-[12rem] w-auto mx-auto" />
            </div>
            <span className="inline-block py-2 px-4 md:py-3 md:px-6 rounded-full bg-brand-light text-brand-medium-blue text-sm md:text-lg font-bold tracking-wide mb-4 md:mb-6 uppercase">
              Unidade Florianópolis Centro
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-blue mb-6 md:mb-8 tracking-tight leading-tight">
              Prevenção é um ato de <span className="text-brand-blue">amor</span>.
            </h1>
            <p className="text-lg md:text-xl text-brand-dark-gray mb-8 md:mb-10 leading-relaxed font-light">
              A maior rede de clínicas de vacinas do Brasil. <br className="hidden md:block" />
              Cuidado humanizado e proteção para todas as idades.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowChecker(true)}
                className="w-full sm:w-auto bg-brand-gradient text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
              >
                <Shield className="w-5 h-5" />
                Verificar Carteirinha
              </button>
              <a
                href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20vacina."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-brand-medium-blue border border-brand-medium-blue/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar Vacina
              </a>
              <a
                href="/vacinas"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-brand-medium-blue border border-brand-medium-blue/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2"
              >
                <Syringe className="w-5 h-5" />
                Conhecer Vacinas
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direct Information Grid */}
      <section className="py-12 md:py-20 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
                Vacinas
              </h3>
              <ul className="space-y-3 text-brand-dark-gray">
                {['Bebês e Crianças', 'Gestantes', 'Adultos e Idosos', 'Ocupacional', 'Viajantes'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-brand-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                Diferenciais
              </h3>
              <p className="text-brand-dark-gray text-sm leading-relaxed mb-4">
                Equipe liderada pela Enf. Millena, focada em atendimento humanizado e técnicas de alívio da dor.
              </p>
              <p className="text-brand-dark-gray text-sm leading-relaxed">
                Ambiente acolhedor e lúdico para crianças.
              </p>
            </div>

            <div id="contato">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                <span className="w-2 h-2 rounded-full bg-brand-dark-blue"></span>
                Contato
              </h3>
              <div className="space-y-4 text-sm text-brand-dark-gray">
                <div className="relative">
                  <button
                    onClick={() => setShowMapMenu(!showMapMenu)}
                    className="flex items-start gap-3 hover:text-brand-blue transition-colors text-left group"
                  >
                    <MapPin className="w-5 h-5 text-brand-medium-gray shrink-0 group-hover:text-brand-blue transition-colors" />
                    <p>Alameda Gov. Heriberto Hulse, 123<br />Centro, Florianópolis – SC</p>
                  </button>

                  <AnimatePresence>
                    {showMapMenu && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowMapMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20"
                        >
                          <div className="p-1">
                            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Abrir com:</div>
                            <a
                              href="https://www.google.com/maps/search/?api=1&query=Alameda+Gov.+Heriberto+Hulse,+123,+Centro,+Florianópolis"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark-gray hover:bg-slate-50 rounded-lg transition-colors"
                              onClick={() => setShowMapMenu(false)}
                            >
                              Google Maps
                            </a>
                            <a
                              href="https://waze.com/ul?q=Alameda+Gov.+Heriberto+Hulse,+123,+Centro,+Florianópolis"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark-gray hover:bg-slate-50 rounded-lg transition-colors"
                              onClick={() => setShowMapMenu(false)}
                            >
                              Waze
                            </a>
                            <a
                              href="http://maps.apple.com/?q=Alameda+Gov.+Heriberto+Hulse,+123,+Centro,+Florianópolis"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark-gray hover:bg-slate-50 rounded-lg transition-colors"
                              onClick={() => setShowMapMenu(false)}
                            >
                              Apple Maps
                            </a>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <a
                  href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-brand-blue transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-brand-medium-gray shrink-0" />
                  <p>(48) 99189-5758</p>
                </a>
                <a
                  href="mailto:contato@saudelivrefloripa.com.br"
                  className="flex items-center gap-3 hover:text-brand-blue transition-colors"
                >
                  <Mail className="w-5 h-5 text-brand-medium-gray shrink-0" />
                  <p>contato@saudelivrefloripa.com.br</p>
                </a>
                <div className="pt-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Segunda a Sexta: 08:00 - 18:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 text-center text-brand-medium-gray text-sm bg-slate-50 flex flex-col items-center gap-4">
        <img src="/logo-header.png" alt="Saúde Livre" className="h-8 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" />
        <p>© 2025 Saúde Livre Vacinas. Florianópolis Centro.</p>
      </footer>

      {/* VacinaCheck Modal */}
      <AnimatePresence>
        {showChecker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-md overflow-y-auto"
          >
            <div className="min-h-screen p-0 md:p-8 flex items-center justify-center">
              <div className="w-full h-full md:h-auto md:max-w-5xl relative bg-slate-50 md:bg-white md:rounded-3xl shadow-2xl border-0 md:border border-slate-100 overflow-hidden flex flex-col">
                <button
                  onClick={() => setShowChecker(false)}
                  className="absolute top-6 right-6 z-50 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="max-h-[90vh] overflow-y-auto">
                  <VacinaCheck />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
