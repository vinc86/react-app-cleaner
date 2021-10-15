const fs = require('fs');

const cleanFolder = (path, folderName, environment) => {
    const localPath = __dirname.split("/util").join("");
    const location = environment === "typescript" ? "ts" : "js";

    const contentForReplacement = folderName === "src" ? fs.readdirSync(`${localPath}/templates/${location}-${folderName}`) : fs.readdirSync(`${localPath}/templates/public`);

    if (folderName === "public") {
        contentForReplacement.forEach(file => {
            const fileToWrite = fs.readFileSync(`${localPath}/templates/${folderName}/${file}`);
            fs.writeFileSync(`${path}/${folderName}/${file}`, fileToWrite);
        })

    } else {

        contentForReplacement.forEach(file => {
            const fileToWrite = fs.readFileSync(`${localPath}/templates/${location}-${folderName}/${file}`);
            fs.writeFileSync(`${path}/${folderName}/${file}`, fileToWrite);
        })
    }
}

module.exports = cleanFolder;