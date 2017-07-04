'use strict';
module.exports = function(Sequelize, DataTypes) {
  var users = Sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING(24),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    picture: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        users.hasMany(models.groups);
        users.hasMany(models.usr_groups);
        users.hasMany(models.posts);
        users.hasMany(models.comments);
        users.hasMany(models.likes);
      }
    }
  });
  return users;
}
