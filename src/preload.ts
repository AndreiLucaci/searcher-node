// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { ElectronAPI } from "./utils/electronApi";

contextBridge.exposeInMainWorld("electronAPI", {
  readdir: (filePath: string) => ipcRenderer.invoke("readdir", filePath),
  exec: (command: string) => ipcRenderer.invoke("exec", command),
  platform: () => ipcRenderer.invoke("platform"),
  __dirname: () => ipcRenderer.invoke("__dirname"),
} as ElectronAPI);

console.log("loaded the preload");
