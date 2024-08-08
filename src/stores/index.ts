import { BehaviorSubject } from "rxjs";
import { ExtendedDirent } from "../utils/types";

export class StoreConstructor {
  $searchTerm = new BehaviorSubject<string>("");
  $discoveredFiles = new BehaviorSubject<ExtendedDirent[]>([]);
  $filteredFiles = new BehaviorSubject<ExtendedDirent[]>([]);
  $fileToBeOpened = new BehaviorSubject<ExtendedDirent | undefined>(undefined);
}

export const Store = new StoreConstructor();
