module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rating', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      juror_id: {
        type: Sequelize.INTEGER,
        references: { model: 'jurors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      participant_id: {
        type: Sequelize.INTEGER,
        references: { model: 'participants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      posture: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      voice_quality: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      tuning: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      diction: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      rhythm: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('rating');
  },
};
