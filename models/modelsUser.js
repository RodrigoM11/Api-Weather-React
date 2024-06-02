const db = require('./../adapter')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const { v1: uuidv1 } = require('uuid');

async function create ({ email, password }) {
    const avatarHash = crypto.createHash('md5').update(email).digest("hex")
    const avatar = `https://gravatar.com/avatar/${avatarHash}`
  
    // Create a user
    const user = {
      id: uuidv1(),
      password: await bcrypt.hash(password, 10), //encrypted password
      avatar,
      email
    }
  
    // Write in db.json
    db.get('users')
      .push(user)
      .write()
  
    return user;
  }
  
  function find ({ email }) {
    return db.get('users')
      .find({ email })
      .value()
  }

module.exports = { create, find }