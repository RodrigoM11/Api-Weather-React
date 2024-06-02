
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");


const json = require('./db.json')
const isLocal = true
const type = new FileSync('./db.json') 

const db = low(type);

db.defaults(json).write();

module.exports = db;