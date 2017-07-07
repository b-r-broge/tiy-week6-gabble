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
    authorId: {
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
  }, {})

  groups.associate = function(models) {
        // more associations
        this.belongsTo(models.users);
        this.hasMany(models.posts, {as: 'posts', foreignKey: 'groupId'});
        // this.hasMany(models.usrgroups, {as: 'usrgroups', foreignKey: 'groupId'});
      }

  return groups
}
