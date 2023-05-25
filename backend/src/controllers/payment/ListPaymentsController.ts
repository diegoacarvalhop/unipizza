import { Request, Response } from "express";
import { ListPaymentsService } from "../../services/payment/ListPaymentsService";

class ListPaymentsController {
    async handle(req: Request, res: Response) {

        const service = new ListPaymentsService();

        const payments = await service.execute();

        return res.json(payments);
    }
}

export { ListPaymentsController }