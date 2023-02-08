const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'eu-cdbr-west-03.cleardb.net',
      port : 3306,
      user : 'b9bdaa155b903e',
      password : '8ce298fd',
      database : 'heroku_3c6b299d53dcdbe'
    }
  });

module.exports = knex