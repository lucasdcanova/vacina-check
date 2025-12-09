import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'br.com.saudelivre.vacinacheck',
    appName: 'VacinaCheck',
    webDir: 'out',

    // iOS specific configuration
    ios: {
        // Allow mixed content for development
        allowsLinkPreview: true,
        scrollEnabled: true,
        // Use WKWebView
        preferredContentMode: 'mobile',
        // Handle status bar
        overrideUserAgent: 'VacinaCheck-iOS',
        // Scheme
        scheme: 'VacinaCheck',
        // Allows capacitor:// and https:// URLs
        limitsNavigationsToAppBoundDomains: true,
        // Enable push notifications
        handleApplicationNotifications: true,
        // Privacy
        appendUserIntentToUrl: false,
        // Enable modern features
        webContentsDebuggingEnabled: false,
    },

    // Server configuration
    server: {
        // For production, leave this empty
        // For development, uncomment the following:
        // url: 'http://localhost:3000',
        // cleartext: true,

        // Handle errors gracefully
        errorPath: '/error.html',

        // iOS specific server config
        iosScheme: 'capacitor',
    },

    // Plugins configuration
    plugins: {
        // Splash Screen
        SplashScreen: {
            launchShowDuration: 2000,
            launchAutoHide: true,
            launchFadeOutDuration: 500,
            backgroundColor: '#0072a2',
            androidSplashResourceName: 'splash',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
            iosSpinnerStyle: 'small',
            spinnerColor: '#ffffff',
            splashFullScreen: true,
            splashImmersive: true,
            layoutName: 'launch_screen',
            useDialog: false,
        },

        // Status Bar
        StatusBar: {
            style: 'LIGHT',
            backgroundColor: '#0072a2',
            overlaysWebView: true,
        },

        // Keyboard
        Keyboard: {
            resizeOnFullScreen: true,
        },

        // Haptics
        Haptics: {
        },
    },

    // Include source maps for debugging
    includePlugins: [
        '@capacitor/app',
        '@capacitor/haptics',
        '@capacitor/keyboard',
        '@capacitor/status-bar',
        '@capacitor/splash-screen',
        '@capacitor/browser',
    ],
};

export default config;
