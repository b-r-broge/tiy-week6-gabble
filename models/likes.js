'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    liked: {
      type: DataTypes.BOOLEAN,
      default: false
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

  likes.associate = function(models) {
    this.belongsTo(models.users, {foreignKey: 'authorId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'users'});
    this.belongsTo(models.posts, {foreignKey: 'postId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'posts'});
  }

  return likes
}
