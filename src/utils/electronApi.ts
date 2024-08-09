import { Config, ExtendedDirent } from "./types";

export type ElectronAPI = {
  readdir: (path: string) => Promise<ExtendedDirent[]>;
  exec: (command: string) => Promise<void>;
  platform: () => Promise<string>;
  __dirname: () => Promise<string>;
  getConfig: () => Promise<Config>;
};

export type ElectronApiWindow = {
  electronAPI: ElectronAPI;
};
