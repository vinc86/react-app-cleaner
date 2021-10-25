import fs from "fs";
import { RootDir } from "src/types";

export const readRootDir = (path: string) => {
  const folders = fs.readdirSync(path);
  const selection: string[] = [];
  folders.map((folder) => {
    if (folder === RootDir.PUBLIC || folder === RootDir.SRC) {
      selection.push(folder);
    }
  });
  return selection;
};
