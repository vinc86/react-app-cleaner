const fs = require('fs');

const getPackageInit = (path) => {
    
    let response;

    fs.readdirSync(path).map(file => {
        if (file === 'package-lock.json') {
            response = "npm i"
        } 

        if(file === 'yarn.lock') {
            response = "yarn add"
        }
    })

    return response;
}

module.exports = getPackageInit;