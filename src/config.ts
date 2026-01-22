const REQUIRED_ENV_VARS = [
    'SESSION_SECRET',
    'AI_INTEGRATIONS_OPENAI_BASE_URL',
    'AI_INTEGRATIONS_OPENAI_API_KEY',
] as const;

type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];

export const config = {
    sessionSecret: process.env.SESSION_SECRET ?? '',
    aiIntegrations: {
        openaiBaseUrl: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL ?? '',
        openaiApiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY ?? '',
    },
};

export function getMissingEnvVars(): RequiredEnvVar[] {
    return REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
}

export function logMissingEnvVars(): void {
    const missing = getMissingEnvVars();

    if (missing.length === 0) {
        return;
    }

    console.warn(
        `Missing required environment variables: ${missing.join(', ')}. ` +
            'Set them to enable session and AI integrations.',
    );
}
