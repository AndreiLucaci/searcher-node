import { Dirent } from "fs";

export type DirentType = typeof Dirent;
export type ExtendedDirent = DirentType & {
  id: string;
  path: string;
  parentPath: string;
  ext: string;
  normalizedName: string;
  fullPath: string;
};

export type Config = {
  folderPath: string;
};
