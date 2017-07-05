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
        likes.belongsTo(models.users);
        likes.belongsTo(models.posts);
      }
    }
  })
  return likes
}
