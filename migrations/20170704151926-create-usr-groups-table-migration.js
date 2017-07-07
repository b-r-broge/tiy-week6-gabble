'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('usrGroups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      },
      groupId: {
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
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('usrGroups');
  }
};
