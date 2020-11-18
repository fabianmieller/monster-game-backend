'use strict'

// var dbm
// var type
// var seed

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  // dbm = options.dbmigrate
  // type = dbm.dataType
  // seed = seedLink
}

exports.up = function(db) {
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    oauth_provider: { type: 'string' },
    oauth_uid: { type: 'string', lenght: 50 },
    username: { type: 'string', lenght: 50 },
    created_at: { type: 'datetime', notNull: true },
    updated_at: { type: 'datetime', notNull: true },
  })
}

exports.down = function(db) {
  return db.dropTable('users')
}

exports._meta = {
  'version': 1
}
