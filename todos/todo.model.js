const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
  };

  return sequelize.define('Todo', attributes, options);
}

module.exports = model;
