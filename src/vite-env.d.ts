/// <reference types="vite/client" />

interface ImportMetaEnv {
    // 环境变量类型声明
    readonly VITE_APP_TITLE: string;
    readonly VITE_IMG_BASE_URL: string;
    readonly VITE_NODE_ENV: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}