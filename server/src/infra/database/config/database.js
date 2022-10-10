require('dotenv').config();
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'funchat',
    host: 'mysql',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: 'localhost',
    dialect: 'mysql',
  },
};
