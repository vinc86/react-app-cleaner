import fs from "fs";
import { Environment, RootDir } from "../types";

export const cleanFolder = (
  path: string,
  folderName: string,
  environment: Environment | undefined
) => {
  const localPath = __dirname.split("/src/util").join("");
  const location = environment && environment === Environment.TS ? "ts" : "js";

  const contentForReplacement =
    folderName === RootDir.SRC
      ? fs.readdirSync(`${localPath}/templates/${location}-${folderName}`)
      : fs.readdirSync(`${localPath}/templates/public`);

  if (folderName === RootDir.PUBLIC) {
    contentForReplacement.forEach((file) => {
      const fileToWrite = fs.readFileSync(
        `${localPath}/templates/${folderName}/${file}`
      );
      fs.writeFileSync(`${path}/${folderName}/${file}`, fileToWrite);
    });
  } else {
    contentForReplacement.forEach((file) => {
      const fileToWrite = fs.readFileSync(
        `${localPath}/templates/${location}-${folderName}/${file}`
      );
      fs.writeFileSync(`${path}/${folderName}/${file}`, fileToWrite);
    });
  }
};
