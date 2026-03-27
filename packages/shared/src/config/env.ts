export interface AppEnv {
    firebase: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    };

    apiUrl: string;
    stripePublicKey: string;
}

// Factory (optional but clean)
export function createEnv(env: AppEnv): AppEnv {
    return env;
}
