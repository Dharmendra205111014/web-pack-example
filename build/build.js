'use strict'

require('./check-versions')() //Ensure consistent version metadata across JavaScript package managers.

process.env.NODE_ENV = 'production' // Environment can be set in script from package.json

const ora = require('ora') // Elegant terminal spinner
const rm = require('rimraf') //The UNIX command rm -rf for node.
const path = require('path')
const chalk = require('chalk') //Terminal string styling done right
const webpack = require('webpack')

const config = require('../config')