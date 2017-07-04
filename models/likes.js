'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    liked: {
      type: Sequelize.BOOLEAN,
      default: false
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
        likes.belongsTo(models.users);
        likes.belongsTo(models.posts);
      }
    }
  })
  return likes
}
