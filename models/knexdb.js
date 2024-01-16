// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host : 'eu-cdbr-west-03.cleardb.net',
//       port : 3306,
//       user : 'b9bdaa155b903e',
//       password : '8ce298fd',
//       database : 'heroku_3c6b299d53dcdbe'
//     }
//   });

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "eu-cluster-west-01.k8s.cleardb.net",
    port: 3306,
    user: "b685b6f6c48afd",
    password: "aea17206",
    database: "heroku_bf88614f130d16e",
  },
});

module.exports = knex;
