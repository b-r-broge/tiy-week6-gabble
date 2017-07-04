'use strict';
module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define('comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING(140),
      allowNull: false
    },
    posted_at: {
      type: Sequelize.DATE,
      default: Sequelize.NOW
    },
    author_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
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
        // more associations
        comments.belongsTo(models.users);
        comments.belongsTo(models.posts);
      }
    }
  })
  return comments
}
