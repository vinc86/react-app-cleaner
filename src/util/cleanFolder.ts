import fs from "fs";
import { Environment, RootDir } from "src/types";

const cleanFolder = (
  path: string,
  folderName: string,
  environment: Environment
) => {
  const localPath = __dirname.split("/util").join("");
  const location = environment === Environment.TS ? "ts" : "js";

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

export default cleanFolder;
