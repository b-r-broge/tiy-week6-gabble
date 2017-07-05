'use strict';
module.exports = function(sequelize, DataTypes) {
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
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'groups',
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
        posts.belongsTo(models.users);
        posts.belongsTo(models.groups);
        posts.hasMany(models.comments);
        posts.hasMany(models.likes);
      }
    }
  })
  return posts
}
