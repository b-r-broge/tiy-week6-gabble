'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('likes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      liked: {
        type: Sequelize.BOOLEAN,
        default: false
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
      postId: {
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
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('likes');
  }
};
