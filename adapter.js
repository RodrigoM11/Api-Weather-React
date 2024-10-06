
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const Memory = require('lowdb/adapters/Memory');

const json = require('./db.json')
const isLocal = true
const type = new Memory 

const db = low(type);

db.defaults(json).write();

module.exports = db;