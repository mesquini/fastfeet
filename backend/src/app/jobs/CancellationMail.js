import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { deliveryProblem } = data;
        const { delivery } = deliveryProblem;
        const { deliveryman } = delivery;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Entrega cancelada',
            template: 'cancellation',
            context: {
                name: deliveryman.name,
                product_id: delivery.id,
                product: delivery.product,
                problem: deliveryProblem.description,
            },
        });
    }
}

export default new CancellationMail();
