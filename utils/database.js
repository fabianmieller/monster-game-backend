const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('storage.sqlite', err => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Connected to the SQlite database.')
})

module.exports = db
