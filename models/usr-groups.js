'use strict';
module.exports = function(Sequelize, DataTypes) {
  var usr-groups = Sequelize.define('usr-groups', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
        // more associations
        usr-groups.belongsTo(models.users);
        usr-groups.belongsTo(models.groups);
      }
    }
  })
  return usr_groups
}
