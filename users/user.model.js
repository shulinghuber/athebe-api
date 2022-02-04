const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false }  
  };

  const options = {
    defaultScope: {
        // exclude password hash by default
        attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
        // include hash with this scope
        withHash: { attributes: {}, }
    }
  };

  return sequelize.define('User', attributes, options);
}

module.exports = model;
