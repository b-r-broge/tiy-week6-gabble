'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('groups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      groupname: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('groups');
  }
};
