import fs from "fs";
import { Environment } from "src/types";

const setEnvironment = (path: string) => {
  let environment: Environment | undefined = undefined;

  fs.readdirSync(path).map((file) => {
    if (file === "package.json") {
      const pkg = JSON.parse(fs.readFileSync(file).toString());
      pkg.dependencies.typescript
        ? (environment = Environment.TS)
        : (environment = Environment.JS);
    }
  });
  return environment;
};

export default setEnvironment;
