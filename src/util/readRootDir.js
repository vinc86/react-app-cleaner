const fs = require('fs');

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

module.exports = readRootDir;