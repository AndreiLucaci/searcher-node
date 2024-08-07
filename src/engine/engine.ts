import { readdir } from "node:fs/promises";
import { Dirent } from "node:fs";
import { Store } from "../stores";
import Fuse from "fuse.js";
import { distinctUntilChanged } from "rxjs";
import { exec } from "child_process";

const getCommandLine = () => {
  switch (process.platform) {
    case "darwin":
      return "open";
    case "win32":
      return "start";
    default:
      return "xdg-open";
  }
};

export class Engine {
  validLookupFiles = [".ppt", ".pptx"];

  constructor() {
    Store.$fileToBeOpened.pipe(distinctUntilChanged()).subscribe((value) => {
      exec(getCommandLine() + " " + value.parentPath);
    });

    this.initializeLookup();
  }

  async initializeLookup(): Promise<Dirent[]> {
    const files = await readdir("./", {
      recursive: true,
      withFileTypes: true,
    });

    console.log(`found ${files.length} files`);

    const pptFiles = files.filter(
      (x) =>
        x.isFile() &&
        this.validLookupFiles.some((y) => x.parentPath.endsWith(y))
    );

    Store.$discoveredFiles.next(pptFiles);

    return pptFiles;
  }

  lookupFile(value: string): void {
    const existingFiles = Store.$discoveredFiles.value;

    if (!existingFiles.length) return;

    const fuse = new Fuse(existingFiles, {
      keys: ["name"],
    });
    const filteredResult = fuse.search(value);

    Store.$filteredFiles.next(filteredResult);
  }
}
