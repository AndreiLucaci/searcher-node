import { FuseResult } from "fuse.js";
import { Dirent } from "node:fs";
import { BehaviorSubject } from "rxjs";

export class StoreConstructor {
  $searchTerm = new BehaviorSubject<string>("");
  $discoveredFiles = new BehaviorSubject<Dirent[]>([]);
  $filteredFiles = new BehaviorSubject<FuseResult<Dirent>[]>([]);
  $fileToBeOpened = new BehaviorSubject<Dirent | undefined>(undefined);
}

export const Store = new StoreConstructor();
