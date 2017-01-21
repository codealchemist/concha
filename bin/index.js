#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')

// print ascii art
const artFile = path.join(__dirname, '/../src/ascii-art.txt')
const art = fs.readFileSync(artFile, 'utf8')
console.info(art)

const index = path.join(__dirname, '../src/index.js')
require(index)()
