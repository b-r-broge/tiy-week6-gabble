'use strict';
module.exports = function(sequelize, DataTypes) {
  var users_bak = sequelize.define('users_bak', {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users_bak;
};