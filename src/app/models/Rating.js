import Sequelize, { Model } from 'sequelize';

class Rating extends Model {
  static init(sequelize) {
    super.init(
      {
        posture: Sequelize.FLOAT,
        voice_quality: Sequelize.FLOAT,
        tuning: Sequelize.FLOAT,
        diction: Sequelize.FLOAT,
        rhythm: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Juror, { foreignKey: 'juror_id', as: 'juror' });
    this.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
      as: 'participant',
    });
  }
}

export default Rating;
