export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_CONNECTION: string;
    }
  }
}
