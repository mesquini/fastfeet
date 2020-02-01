import Sequelize from 'sequelize';
import Recipient from '../app/models/Recipient';

import databaseConfig from '../config/database';

const models = [Recipient];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(m => m.init(this.connection));
    }
}

export default new Database();
