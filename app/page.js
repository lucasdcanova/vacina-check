'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Shield, Check, X } from 'lucide-react';
import VacinaCheck from '@/components/VacinaCheck';

export default function LandingPage() {
  const [showChecker, setShowChecker] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-brand-dark-gray selection:bg-brand-cyan/20">
      {/* Minimal Header */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo-header.png" alt="Saúde Livre" className="h-10 w-auto" />
          </div>
          <button
            onClick={() => setShowChecker(true)}
            className="text-sm font-medium text-brand-blue hover:text-brand-dark-blue transition-colors"
          >
            Verificar Carteirinha →
          </button>
        </div>
      </nav>

      {/* Clean Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <img src="/hero-logo.png" alt="Saúde Livre Logo" className="h-32 w-auto" />
            </div>
            <span className="inline-block py-1 px-3 rounded-full bg-brand-light text-brand-medium-blue text-xs font-semibold tracking-wide mb-6 uppercase">
              Unidade Florianópolis Centro
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-brand-dark-blue mb-8 tracking-tight leading-tight">
              Prevenção é um ato de <span className="text-brand-blue">amor</span>.
            </h1>
            <p className="text-xl text-brand-dark-gray mb-10 leading-relaxed font-light">
              A maior rede de clínicas de vacinas do Brasil. <br className="hidden md:block" />
              Cuidado humanizado e proteção para todas as idades.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowChecker(true)}
                className="w-full sm:w-auto bg-brand-gradient text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
              >
                <Shield className="w-5 h-5" />
                Verificar Carteirinha Digital
              </button>
              <a
                href="#contato"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-brand-medium-blue border border-brand-medium-blue/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2"
              >
                Agendar Vacina
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direct Information Grid */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
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
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-medium-gray shrink-0" />
                  <p>Alameda Gov. Heriberto Hulse, 123<br />Centro, Florianópolis – SC</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-medium-gray shrink-0" />
                  <p>(48) 99189-5758</p>
                </div>
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
            <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
              <div className="w-full max-w-5xl relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
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
