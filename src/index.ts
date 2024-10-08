import { app, BrowserWindow, ipcMain } from "electron";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import path from "path";
import fs, { Dirent } from "fs";
import { exec } from "child_process";
import { ExtendedDirent } from "./utils/types";
import { v4 as uuid } from "uuid";
import { map } from "rxjs";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

ipcMain.handle(
  "readdir",
  async (event, filePath: string): Promise<ExtendedDirent[]> => {
    const files = await fs.promises.readdir(filePath, {
      recursive: true,
      withFileTypes: true,
    });

    const mappedFiles = files
      .filter((x) => x.isFile())
      .map((x) => {
        const extendedDirent = x as unknown as ExtendedDirent;
        extendedDirent.id = uuid();
        extendedDirent.ext = extendedDirent.name.split(".").pop();
        extendedDirent.normalizedName = extendedDirent.name.replace(
          new RegExp(`\\.${extendedDirent.ext}$`),
          ""
        );
        extendedDirent.fullPath = path.join(__dirname, x.parentPath, x.name);
        return extendedDirent;
      });

    return mappedFiles;
  }
);

ipcMain.handle("platform", async (event) => {
  return Promise.resolve(process.platform);
});

ipcMain.handle("exec", async (event, command) => {
  return new Promise((resolve, reject) => {
    console.log("executing command: " + command);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout ? stdout : stderr);
    });
  });
});

ipcMain.handle("getConfig", async (event) => {
  // const config = fs.readFileSync(path.join(__dirname, "config.json"), "utf-8");
});

ipcMain.handle("__dirname", async (event) => {
  const dirPath = path.parse(app.getPath("exe")).dir;
  const actualPath = path.normalize(path.join(dirPath, "../../.."));
  return Promise.resolve(actualPath);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
