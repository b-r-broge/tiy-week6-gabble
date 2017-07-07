'use strict';
module.exports = function(Sequelize, DataTypes) {
  var usr_groups = Sequelize.define('usr-groups', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    },
    group_id: {
      type: DataTypes.INTEGER,
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
        usr_groups.belongsTo(models.users);
        usr_groups.belongsTo(models.groups);
      }
    }
  },
  {underscored: true}
  );
  return usr_groups
}
