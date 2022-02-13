const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to database
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  // initialze models 
  db.User = require('../users/user.model')(sequelize);
  db.Todo = require('../todos/todo.model')(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });

}