// Manually define the environment variables interface as vite/client types may be missing
interface ImportMetaEnv {
    readonly VITE_CONTENTFUL_SPACE_ID: string
    readonly VITE_CONTENTFUL_ACCESS_TOKEN: string
    [key: string]: string | boolean | undefined
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  