/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANYROUTER_API_KEY: string
  readonly VITE_AI_MODEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
