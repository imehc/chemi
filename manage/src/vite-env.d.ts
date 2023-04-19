/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  /**
   * 定义的环境变量名称
   */
  readonly VITE_CESIUM_BASE_URL: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
