// src/types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    HUME_API_KEY: string;
    HUME_SECRET_KEY: string;
    NEXT_PUBLIC_HUME_CONFIG_ID: string;
  }
}