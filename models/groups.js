'use strict';
module.exports = function(Sequelize, DataTypes) {
  var groups = Sequelize.define('groups', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false
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
        groups.belongsTo(models.users);
        groups.hasMany(models.usr_groups);
        groups.hasMany(models.posts)
      }
    }
  })
  return groups
}
