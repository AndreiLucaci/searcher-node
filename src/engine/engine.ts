import { Store } from "../stores";
import { distinctUntilChanged } from "rxjs";
import { Constants } from "../utils/constants";
import { ElectronApiWindow } from "../utils/electronApi";
import { ExtendedDirent } from "../utils/types";
import FuzzySearch from "fuzzy-search";

const getCommandLine = async () => {
  const electronWindow = window as unknown as ElectronApiWindow;

  switch (await electronWindow.electronAPI.platform()) {
    case "darwin":
      return "open";
    case "win32":
      return "start";
    default:
      return "xdg-open";
  }
};

export class Engine {
  validLookupFiles = Constants.normalizedFileTypes;

  constructor() {
    Store.$fileToBeOpened
      .pipe(distinctUntilChanged())
      .subscribe(async (value) => {
        if (!value) return;

        const electronWindow = window as unknown as ElectronApiWindow;
        const commandLine = await getCommandLine();
        const command = `${commandLine} ${value.parentPath}/${value.name}`;
        console.log("Executing " + command);
        await electronWindow.electronAPI.exec(command);
      });

    Store.$searchTerm.pipe(distinctUntilChanged()).subscribe((value) => {
      if (!value) return;

      this.lookupFile(value);
    });

    this.initializeLookup();
  }

  async initializeLookup(): Promise<ExtendedDirent[]> {
    const electronWindow = window as unknown as ElectronApiWindow;

    const files = await electronWindow.electronAPI.readdir(
      await electronWindow.electronAPI.__dirname()
      // remote.app.getAppPath()
    );
    const filteredFiles = files.filter((x) =>
      this.validLookupFiles.includes(x.ext)
    );

    console.log(`found ${filteredFiles.length} files`);

    Store.$discoveredFiles.next(filteredFiles);

    return filteredFiles;
  }

  lookupFile(value: string): void {
    const existingFiles = Store.$discoveredFiles.value;

    if (!existingFiles.length) return;

    const searcher = new FuzzySearch(existingFiles, ["name"], {
      caseSensitive: false,
      sort: true,
    });

    const filteredResult = searcher.search(value);

    Store.$filteredFiles.next(filteredResult);
  }
}
