'use strict';
module.exports = function(sequelize, DataTypes) {
  var posts = sequelize.define('posts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING(140),
      allowNull: false
    },
    edit: {
      type: Sequelize.BOOLEAN,
      default: false
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
    group_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'groups',
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
        posts.belongsTo(models.users);
        posts.belongsTo(models.groups);
        posts.hasMany(models.comments);
        posts.hasMany(models.likes);
      }
    }
  })
  return posts
}
