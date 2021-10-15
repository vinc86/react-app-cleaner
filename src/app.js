#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const path = process.cwd();


const isReactInstalled = (path) => {
    
    let response = {};

    fs.readdirSync(path).map(file => {
        if (file === 'package.json') {
            const package = JSON.parse(fs.readFileSync(file));

            if(package.dependencies.react && package.dependencies["react-dom"]) {
               response.react = true;     
            }   
        }  
    })
    
    if(!response.react){
        console.log("\x1b[31mI'M SORRY:\x1b[0m \nYour project is not setup with react. \nInitialize it with \x1b[34mnpx create-react-app <app-name>\x1b[0m or \x1b[34myarn create react-app <app-name> \x1b[0mand then try again.");
        return response.react = false;
    }

    return response;
}

const setEnvironment = (path) => {
    let environment = "";
    fs.readdirSync(path).map(file => {
        if (file === 'package.json') {
            
            const package = JSON.parse(fs.readFileSync(file));
            package.dependencies.typescript ? environment = "typescript" : environment = "javascript";
             
        }
    })
    return environment;
}

const environment = setEnvironment(path);


const readRootDir = (path) => {
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
    const location = environment === "typescript" ? "ts" : "js";
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

 (async () => !!isReactInstalled(path) && inquirer.prompt([{
        name: 'selection',
        message: "Select the folder:",
        type: 'list',
        choices: readRootDir(path)

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

                console.log(`\x1b[34m${folder.selection}\x1b[0m folder was cleaned successfully!`);

            }

            inquirer.prompt([{
                name: "more",
                type: "confirm",
                message: `Would you want to clean also \x1b[34m${folder.selection === "public" ? "src" : "public"}\x1b[0m folder?`
            }]).then(({ more }) => {

                const otherFolder = readRootDir(path).filter(f => f !== folder.selection).join("");
                
                if (more === true) {
                    fs.rmdirSync(`${path}/${otherFolder}`, { recursive: true })
                    fs.mkdirSync(`${path}/${otherFolder}`);

                    cleanFolder(otherFolder, environment)
                    console.log(`\x1b[34m${otherFolder}\x1b[0m folder was cleaned successfully!`);
                }
            })

        }).catch(err => console.log(err))

    })

)();
