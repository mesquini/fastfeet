import { Model, Sequelize } from 'sequelize';

class Deliveryman extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'deliverymanes',
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
}

export default Deliveryman;
