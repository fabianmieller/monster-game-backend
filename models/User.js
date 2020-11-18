const db = require('../utils/database')

module.exports = class User {
  constructor(id, oauth_provider, oauth_uid, username, created_at, updated_at) {
    this.id = id
    this.oauth_provider = oauth_provider
    this.oauth_uid = oauth_uid
    this.username = username
    this.created_at = created_at
    this.updated_at = updated_at
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      let responseObj
      db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
          responseObj = {
            error: err
          }
          reject(responseObj)
        }
        responseObj = {
          data: rows,
        }
        resolve(responseObj)
      })
    })
  }
}
