'use client';

import { useEffect, useCallback } from 'react';

/**
 * Hook para integração com Capacitor (iOS nativo)
 * Gerencia funcionalidades nativas quando rodando como app
 */
export function useCapacitor() {
    const isNative = typeof window !== 'undefined' &&
        window.Capacitor !== undefined;

    // Inicializar plugins nativos
    useEffect(() => {
        if (!isNative) return;

        const initializePlugins = async () => {
            try {
                // Status Bar
                const { StatusBar, Style } = await import('@capacitor/status-bar');
                await StatusBar.setStyle({ style: Style.Light });
                await StatusBar.setBackgroundColor({ color: '#0072a2' });

                // Splash Screen
                const { SplashScreen } = await import('@capacitor/splash-screen');
                await SplashScreen.hide({
                    fadeOutDuration: 500,
                });

                // Keyboard
                const { Keyboard } = await import('@capacitor/keyboard');
                Keyboard.addListener('keyboardWillShow', () => {
                    document.body.classList.add('keyboard-visible');
                });
                Keyboard.addListener('keyboardWillHide', () => {
                    document.body.classList.remove('keyboard-visible');
                });

                // App lifecycle
                const { App } = await import('@capacitor/app');
                App.addListener('appStateChange', ({ isActive }) => {
                    console.log('App state changed. Is active?', isActive);
                });

                // Handle back button (Android & iOS)
                App.addListener('backButton', ({ canGoBack }) => {
                    if (canGoBack) {
                        window.history.back();
                    } else {
                        App.minimizeApp();
                    }
                });

                // Handle URL open (deep links)
                App.addListener('appUrlOpen', ({ url }) => {
                    console.log('App opened with URL:', url);
                    // Handle deep links here
                    const path = new URL(url).pathname;
                    if (path) {
                        window.location.href = path;
                    }
                });

            } catch (error) {
                console.log('Capacitor plugins not available:', error);
            }
        };

        initializePlugins();
    }, [isNative]);

    // Haptic feedback
    const hapticImpact = useCallback(async (style = 'medium') => {
        if (!isNative) return;

        try {
            const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
            const impactStyle = {
                light: ImpactStyle.Light,
                medium: ImpactStyle.Medium,
                heavy: ImpactStyle.Heavy,
            }[style] || ImpactStyle.Medium;

            await Haptics.impact({ style: impactStyle });
        } catch (error) {
            console.log('Haptics not available');
        }
    }, [isNative]);

    // Haptic selection (for buttons, toggles)
    const hapticSelection = useCallback(async () => {
        if (!isNative) return;

        try {
            const { Haptics } = await import('@capacitor/haptics');
            await Haptics.selectionChanged();
        } catch (error) {
            console.log('Haptics not available');
        }
    }, [isNative]);

    // Haptic notification (success, warning, error)
    const hapticNotification = useCallback(async (type = 'success') => {
        if (!isNative) return;

        try {
            const { Haptics, NotificationType } = await import('@capacitor/haptics');
            const notificationType = {
                success: NotificationType.Success,
                warning: NotificationType.Warning,
                error: NotificationType.Error,
            }[type] || NotificationType.Success;

            await Haptics.notification({ type: notificationType });
        } catch (error) {
            console.log('Haptics not available');
        }
    }, [isNative]);

    // Open external URL
    const openBrowser = useCallback(async (url) => {
        if (!isNative) {
            window.open(url, '_blank');
            return;
        }

        try {
            const { Browser } = await import('@capacitor/browser');
            await Browser.open({ url });
        } catch (error) {
            window.open(url, '_blank');
        }
    }, [isNative]);

    // Share functionality
    const share = useCallback(async (data) => {
        // Try native share first, fallback to Web Share API
        if (navigator.share) {
            try {
                await navigator.share(data);
                return true;
            } catch (error) {
                console.log('Share cancelled or failed');
                return false;
            }
        }
        return false;
    }, []);

    return {
        isNative,
        hapticImpact,
        hapticSelection,
        hapticNotification,
        openBrowser,
        share,
    };
}

/**
 * Hook para detectar se está em modo standalone (PWA instalado)
 */
export function useStandalone() {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
}

/**
 * Hook para detectar dispositivo iOS
 */
export function useIOS() {
    if (typeof window === 'undefined') return false;

    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Hook para detectar se o app pode ser instalado
 */
export function useInstallPrompt() {
    if (typeof window === 'undefined') {
        return { canInstall: false, prompt: null, isInstalled: false };
    }

    const isInstalled = useStandalone();
    const isIOS = useIOS();

    // iOS tem seu próprio método de instalação (Add to Home Screen)
    if (isIOS && !isInstalled) {
        return {
            canInstall: true,
            isIOS: true,
            isInstalled: false,
            showIOSPrompt: () => {
                // Mostrar instrução para usuário iOS
                return {
                    title: 'Instalar VacinaCheck',
                    message: 'Toque no botão de compartilhar e selecione "Adicionar à Tela de Início"',
                };
            },
        };
    }

    return {
        canInstall: false,
        isInstalled,
    };
}

export default useCapacitor;
