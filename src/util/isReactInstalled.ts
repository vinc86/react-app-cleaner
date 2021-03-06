import fs from "fs";

export const isReactInstalled = (path: string) => {
  let response: { react?: boolean } = {};

  fs.readdirSync(path).map((file) => {
    if (file === "package.json") {
      const usedPackage = fs.readFileSync(file).toString();
      const pkg = JSON.parse(usedPackage);

      if (pkg.dependencies.react && pkg.dependencies["react-dom"]) {
        response.react = true;
      }
    }
  });

  if (!response.react) {
    console.log(
      "\x1b[31mI'M SORRY:\x1b[0m \nYour project is not setup with react. \nInitialize it with \x1b[34mnpx create-react-app <app-name>\x1b[0m or \x1b[34myarn create react-app <app-name> \x1b[0mand then try again."
    );
    return (response.react = false);
  }

  return response;
};
