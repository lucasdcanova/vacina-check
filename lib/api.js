/**
 * API Service Helper
 * 
 * Este módulo gerencia as chamadas de API para funcionar tanto no modo
 * servidor (Next.js web) quanto no modo Capacitor (app nativo).
 * 
 * Na versão web: usa /api/... (API routes do Next.js)
 * Na versão Capacitor: usa NEXT_PUBLIC_API_URL (servidor externo)
 */

// Detectar se está rodando no Capacitor
const isCapacitor = () => {
    if (typeof window === 'undefined') return false;
    return window.Capacitor !== undefined;
};

// Obter a URL base para APIs
const getApiBaseUrl = () => {
    // Em ambiente Capacitor, usar API externa
    if (isCapacitor()) {
        const externalApi = process.env.NEXT_PUBLIC_API_URL;
        if (externalApi) {
            return externalApi;
        }
        // Fallback para localhost em desenvolvimento
        console.warn('NEXT_PUBLIC_API_URL não definida. APIs podem não funcionar no app.');
        return '';
    }

    // Em ambiente web, usar API interna
    return '';
};

/**
 * Wrapper para fetch com suporte a Capacitor
 */
export async function apiFetch(endpoint, options = {}) {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Accept': 'application/json',
        },
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, mergedOptions);

        // Se não for ok, tentar extrair erro
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: response.statusText }));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

/**
 * Analisar carteirinha de vacinação
 */
export async function analyzeVaccineCard(file, patientInfo) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientInfo', JSON.stringify(patientInfo));

    const response = await apiFetch('/api/analyze-vaccine', {
        method: 'POST',
        body: formData,
    });

    return response.json();
}

/**
 * Verificar saúde da API
 */
export async function checkApiHealth() {
    try {
        const response = await apiFetch('/api/health', {
            method: 'GET',
        });
        return response.ok;
    } catch {
        return false;
    }
}

export default {
    apiFetch,
    analyzeVaccineCard,
    checkApiHealth,
    isCapacitor,
    getApiBaseUrl,
};
