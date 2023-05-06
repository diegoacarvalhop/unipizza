import { Request, Response } from "express";
import { ListTableNotificationService } from "../../services/table/ListTableNotificationService";

class ListTableNotificationController {
    async handle(req: Request, res: Response) {

        const service = new ListTableNotificationService();

        const tables = await service.execute();

        return res.json(tables);
    }
}

export { ListTableNotificationController }