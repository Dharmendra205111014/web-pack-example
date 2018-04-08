'use strict'

const path = require('path') 
const config = require('../config')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'), // get out of build folder
    entry: {
        app: './src/main.js' // Entry JS file to start the build from
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js', // Name will be same given in entry
        publicPath: config.build.assetsPublicPath // Path to store build files
    },
    module: {
        rules: [
            
        ]
    }
}