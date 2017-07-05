'use strict';
module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define('comments', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false
    },
    posted_at: {
      type: DataTypes.DATE,
      default: DataTypes.NOW
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
        deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
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
