'use strict';
module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define('comments', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false
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

  comments.associate = function(models) {
    this.belongsTo(models.users, {foreignKey: 'authorId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'userComments'});
    this.belongsTo(models.posts, {foreignKey: 'postId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'posts'});
  }

  return comments
}
