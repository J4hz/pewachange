/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEADS_ENDPOINT: string;
  readonly VITE_CONTACT_ENDPOINT: string;
  readonly VITE_GA_ID: string;
  readonly VITE_META_PIXEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
