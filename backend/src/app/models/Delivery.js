import { Model, Sequelize } from 'sequelize';

class Delivery extends Model {
    static init(sequelize) {
        super.init(
            {
                product: Sequelize.STRING,
                canceled_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                start_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                end_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'deliveries',
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Recipient, {
            foreignKey: 'recipient_id',
            as: 'recipient',
        });
        this.belongsTo(models.Deliveryman, {
            foreignKey: 'deliveryman_id',
            as: 'deliveryman',
        });
        this.belongsTo(models.Signature, {
            foreignKey: 'signature_id',
            as: 'signature',
        });
    }
}

export default Delivery;
