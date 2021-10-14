#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const path = process.cwd();


/* console.log("cwd",process.cwd())
console.log("path",path+"/logger-client") */


/* fs.readdirSync(cwd()).map(file => {
    if (file === 'package.json') {
        
        const package = JSON.parse(fs.readFileSync(file));
        package.dependencies.typescript ? environment = "typescript" : environment = "javascript";
         
    }
}) */
const readRootDir = () => {
    const folders = fs.readdirSync(path)
    const selection = [];
    folders.map(folder => {
        if (folder === "public" || folder === "src") {
            selection.push(folder);
        }
    })
    return selection;
}


const cleanFolder = (folderName, environment) => {
    const location = environment === "TypeScript" ? "ts" : "js";
    const contentForReplacement = folderName === "src" ? fs.readdirSync(`${__dirname}/templates/${location}-${folderName}`) : fs.readdirSync(`${__dirname}/templates/public`);

    if (folderName === "public") {
        contentForReplacement.forEach(file => {
            const fileToWrite = fs.readFileSync(`${__dirname}/templates/${folderName}/${file}`);
            fs.writeFileSync(`${path}/${folderName}/${file}`, fileToWrite);
        })

    } else {

        contentForReplacement.forEach(file => {
            const fileToWrite = fs.readFileSync(`${__dirname}/templates/${location}-${folderName}/${file}`);
            fs.writeFileSync(`${path}/${folderName}/${file}`, fileToWrite);
        })
    }
}

(async () => inquirer.prompt([{
    name: "environment",
    message: "Your environment?",
    type: "list",
    choices: ["JavaScript", "TypeScript"]

}]).then(({ environment }) => {

    inquirer.prompt([{
        name: 'selection',
        message: "Select the folder:",
        type: 'list',
        choices: readRootDir()

    }]).then(folder => {

        inquirer.prompt([{
            name: "action",
            message: "Would you want to clean it?",
            type: "list",
            choices: ["Yes", "No"]
        }]).then(answer => {


            if (answer.action === "Yes") {
                fs.rmdirSync(`${path}/${folder.selection}`, { recursive: true })
                fs.mkdirSync(`${path}/${folder.selection}`);

                cleanFolder(folder.selection, environment)

                console.log(`${folder.selection} folder was cleaned successfully!`);

            }

            inquirer.prompt([{
                name: "more",
                type: "confirm",
                message: `Would you want to clean also ${folder.selection === "public" ? "src" : "public"}?`
            }]).then(({ more }) => {

                const otherFolder = readRootDir().filter(f => f !== folder.selection).join("");
                
                if (more === true) {
                    fs.rmdirSync(`${path}/${otherFolder}`, { recursive: true })
                    fs.mkdirSync(`${path}/${otherFolder}`);
                    
                    cleanFolder(otherFolder, environment)
                    console.log(`${otherFolder} folder was cleaned successfully!`);
                }
            })

        }).catch(err => console.log(err))

    })

}))()




