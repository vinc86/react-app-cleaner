const fs = require('fs');

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

module.exports = setEnvironment;