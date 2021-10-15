const fs = require('fs');

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

module.exports = isReactInstalled;