import { Request, Response } from "express";
import { CreatePaymentService } from "../../services/payment/CreatePaymentService";

class CreatePaymentController {
    async handle(req: Request, res: Response) {

        console.log('Entrou')

        const table_id = req.query.table_id as string;
        const user_id = req.user_id;
        // const user_id = '2e25d456-ccd3-4854-97f0-61981e66a556';

        const service = new CreatePaymentService();

        const payment = await service.execute({ table_id, user_id });

        return res.json(payment);
    }
}

export { CreatePaymentController }