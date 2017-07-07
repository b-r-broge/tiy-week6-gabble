'use strict';

module.exports = function(Sequelize, DataTypes) {
  // var posts = require('./posts')(Sequelize, DataTypes)
  var users = Sequelize.define('users', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {})

  users.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.groups);
    // this.hasMany(models.usrgroups, {as: 'usrgroups', foreignKey: 'authorId'});
    // this.hasMany(models.posts, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'author_id', as: 'author_id'});
    this.hasMany(models.posts, {as: 'userPosts', foreignKey: 'authorId'});
    this.hasMany(models.comments);
    this.hasMany(models.likes, {as: 'userLikes', foreignKey: 'authorId'});
  };
  return users;
}
