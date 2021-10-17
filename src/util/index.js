const isReactInstalled = require('./isReactInstalled');
const setEnvironment = require('./setEnvironment');
const readRootDir = require('./readRootDir');
const cleanFolder = require('./cleanFolder');
const getPackageInit = require('./getPackageInit');
module.exports = {
    getPackageInit,
    isReactInstalled,
    setEnvironment,
    readRootDir,
    cleanFolder
};