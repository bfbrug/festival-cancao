import Sequelize from 'sequelize';

import User from '../app/models/User';
import Juror from '../app/models/Juror';
import Participant from '../app/models/Participant';

import databaseConfig from '../config/database';

const models = [User, Juror, Participant];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
