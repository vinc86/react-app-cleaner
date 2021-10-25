#!/usr/bin/env node
import { exec } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import { cleanFolder } from "./util/cleanFolder";
import { getPackageInit } from "./util/getPackageInit";
import { isReactInstalled } from "./util/isReactInstalled";
import { readRootDir } from "./util/readRootDir";
import { setEnvironment } from "./util/setEnvironment";

const path = process.cwd();
const environment = setEnvironment(path);

(async () =>
  !!isReactInstalled(path) &&
  inquirer
    .prompt([
      {
        name: "selection",
        message: "Select the folder:",
        type: "list",
        choices: readRootDir(path),
      },
    ])
    .then((folder) => {
      inquirer
        .prompt([
          {
            name: "action",
            message: "Would you want to clean it?",
            type: "confirm",
          },
        ])
        .then(({ action }) => {
          if (action === true) {
            fs.rmdirSync(`${path}/${folder.selection}`, { recursive: true });
            fs.mkdirSync(`${path}/${folder.selection}`);

            cleanFolder(path, folder.selection, environment);

            console.log(
              `\x1b[34m${folder.selection}\x1b[0m folder was cleaned successfully!`
            );
          }

          inquirer
            .prompt([
              {
                name: "more",
                type: "confirm",
                message: `Would you want to clean also \x1b[34m${
                  folder.selection === "public" ? "src" : "public"
                }\x1b[0m folder?`,
              },
            ])
            .then(({ more }) => {
              const otherFolder = readRootDir(path)
                .filter((f) => f !== folder.selection)
                .join("");

              if (more === true) {
                fs.rmdirSync(`${path}/${otherFolder}`, { recursive: true });
                fs.mkdirSync(`${path}/${otherFolder}`);

                cleanFolder(path, otherFolder, environment);
                console.log(
                  `\x1b[34m${otherFolder}\x1b[0m folder was cleaned successfully!`
                );
              }

              inquirer
                .prompt([
                  {
                    name: "router",
                    type: "confirm",
                    message:
                      "Would you want to install \x1b[34mreact-router-dom?\x1b[0m",
                  },
                ])
                .then(({ router }) => {
                  if (router === true) {
                    exec(
                      `${getPackageInit(path)} react-router-dom`,
                      (err, stdout) => {
                        if (err) {
                          console.log(err);
                          return;
                        }
                        console.log(stdout);
                        console.log(
                          "\x1b[34mreact-router-dom\x1b[0m successfully installed."
                        );
                      }
                    );
                  }
                });
            });
        })
        .catch((err) => console.log(err));
    }))();
