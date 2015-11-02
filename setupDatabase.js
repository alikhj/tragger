var rethink = require('rethinkdb')

var connection
var db

rethink.connect({
  host: 'localhost',
  port: 28015,
}, function(err, conn) {
  if (err) {
    throw new Error('cannot connect to rethinkdb: ', err)
  }
  connection = conn
  exports.connection = connection
  createDatabase()
})

function createDatabase() {
  rethink.dbList().run(connection, function(err, dbs) {
    if (err) {
      throw new Error('error getting the list of databases: ', err)
    }
    if (dbs.indexOf('traggerdb') === -1) {
      rethink.dbCreate('traggerdb').run(connection, function(err, response) {
        console.log(response)
        console.log('created traggerdb database')
      })
    }
    db = rethink.db('traggerdb')
    exports.db = db
    createTables()
  })
}

function createTables() {
  db.tableList().run(connection, function(err, tables) {
    if (err) {
      throw new Error('error getting the list of databases: ', err)
    }
    createTableWithName('test')

    function createTableWithName(tableName) {
      if (tables.indexOf(tableName) === -1) {
        db.tableCreate(tableName).run(connection, function(err,
          response) {
          if (err) {
            throw new Error('error creating table with name: ' + tableName)
          }
          console.log('table created with name: ' + tableName)
        })
      }
    }
  })
}
