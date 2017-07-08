'use strict';
module.exports = function(sequelize, DataTypes) {
  // var users = require('./users')(sequelize, DataTypes);
  var posts = sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(140),
      allowNull: false
    },
    edit: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    postedAt: {
      type: DataTypes.DATE,
      default: DataTypes.NOW
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

posts.associate = function(models) {
  this.belongsTo(models.users, {foreignKey: 'authorId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'userPosts'});
  this.belongsTo(models.groups, {foreignKey: 'groupId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'groups'});
  this.hasMany(models.comments);
  this.hasMany(models.likes, {as: 'likes', foreignKey: 'postId'});
};

return posts;
}
