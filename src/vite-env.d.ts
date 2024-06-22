/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string;
  // Otras variables de entorno que quieras definir
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
