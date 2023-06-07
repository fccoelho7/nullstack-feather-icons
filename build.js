#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { pascalCase } = require("pascal-case");
const { transform } = require("@svgr/core");

const PATH = path.resolve("node_modules/feather-icons/dist/icons");

const typingTemplate = `
import { NullstackFunctionalComponent } from "nullstack";

export type FeatherIconProps = {
  width?: number;
  height?: number;
  class?: string;
}

export type FeatherIconComponent = NullstackFunctionalComponent<FeatherIconProps>;
`.trim();

fs.readdir(PATH, (err, items) => {
  const index = [];
  const typings = [];
  items
    .filter((name) => name.endsWith(".svg"))
    .forEach((name, pos) => {
      process.stdout.write(
        `Building ${pos}/${items.length}: ` + name.padEnd(42) + "\r"
      );

      const svgCode = fs
        .readFileSync(`${PATH}/${name}`, "utf-8")
        .replace(/\n/gm, " ");

      const componentName =
        pascalCase(name.replace(".svg", "")).replace(/_(\d)/g, "$1") + "Icon";

      // create and transform component
      const component = transform
        .sync(
          svgCode,
          {
            plugins: [
              "@svgr/plugin-svgo",
              "@svgr/plugin-jsx",
              "@svgr/plugin-prettier",
            ],
            icon: true,
            jsxRuntime: "automatic",
          },
          {
            componentName: componentName,
          }
        )
        .replace(/className=/g, "class=");

      // write icon component
      const filePath = path.resolve(`dist/${componentName}.jsx`);

      fs.ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(filePath, component, "utf-8");

      index.push(
        `export { default as ${componentName} } from './${componentName}';`
      );
      typings.push(`export const ${componentName}: FeatherIconComponent;`);
    });

  index.push("");
  typings.push("");

  fs.writeFileSync("./dist/index.js", index.join("\n"), "utf-8");
  fs.writeFileSync(
    "./dist/index.d.ts",
    typingTemplate + "\n\n" + typings.join("\n"),
    "utf-8"
  );
});
