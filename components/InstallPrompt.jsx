'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, Plus, Download } from 'lucide-react';
import { useIOS, useStandalone } from '@/lib/capacitor';

export default function InstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const isIOS = useIOS();
    const isStandalone = useStandalone();

    useEffect(() => {
        // Não mostrar se já está instalado
        if (isStandalone) return;

        // Verificar se já foi rejeitado recentemente
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (dismissed) {
            const dismissedTime = new Date(dismissed);
            const now = new Date();
            const daysSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) return; // Esperar 7 dias
        }

        // Android/Desktop - capturar evento beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setTimeout(() => setShowPrompt(true), 3000); // Mostrar após 3s
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // iOS - mostrar prompt personalizado após delay
        if (isIOS) {
            setTimeout(() => setShowPrompt(true), 5000); // Mostrar após 5s
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, [isIOS, isStandalone]);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Install prompt outcome: ${outcome}`);
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    };

    const handleDismiss = () => {
        localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString());
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe"
            >
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#6de0e4] via-[#0072a2] to-[#15335e]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <Download className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Instalar VacinaCheck</h3>
                                <p className="text-white/80 text-xs">Acesse offline, mais rápido</p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="p-2 text-white/80 hover:text-white transition-colors"
                            aria-label="Fechar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {isIOS ? (
                            // Instruções para iOS
                            <div className="space-y-3">
                                <p className="text-sm text-brand-dark-gray">
                                    Para instalar no seu iPhone:
                                </p>
                                <ol className="space-y-2 text-sm text-brand-dark-gray">
                                    <li className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-brand-light text-brand-blue flex items-center justify-center text-xs font-bold">1</span>
                                        <span>Toque no botão</span>
                                        <Share className="w-4 h-4 text-brand-blue" />
                                        <span>Compartilhar</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-brand-light text-brand-blue flex items-center justify-center text-xs font-bold">2</span>
                                        <span>Role e selecione</span>
                                        <Plus className="w-4 h-4 text-brand-blue" />
                                        <span>"Adicionar à Tela de Início"</span>
                                    </li>
                                </ol>
                                <button
                                    onClick={handleDismiss}
                                    className="w-full mt-4 py-3 bg-brand-gradient text-white rounded-xl font-medium"
                                >
                                    Entendi
                                </button>
                            </div>
                        ) : (
                            // Botão de instalar para Android/Desktop
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 py-3 border border-slate-200 text-brand-medium-gray rounded-xl font-medium hover:bg-slate-50 transition-colors"
                                >
                                    Agora não
                                </button>
                                <button
                                    onClick={handleInstall}
                                    className="flex-1 py-3 bg-brand-gradient text-white rounded-xl font-medium shadow-lg shadow-brand-blue/20"
                                >
                                    Instalar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
