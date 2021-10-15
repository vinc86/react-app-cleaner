const fs = require('fs');

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

module.exports = cleanFolder;