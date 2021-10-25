import fs from "fs";

enum Packages {
  YARN = "yarn.lock",
  NPM = "package-lock.json",
}

const getPackageInit = (path: string) => {
  let response;

  fs.readdirSync(path).map((file) => {
    if (file === Packages.NPM) {
      response = "npm i";
    }

    if (file === Packages.YARN) {
      response = "yarn add";
    }
  });

  return response;
};

export default getPackageInit;
