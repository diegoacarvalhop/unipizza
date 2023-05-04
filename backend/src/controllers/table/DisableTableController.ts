import { Request, Response } from "express";
import { DisableTableService } from "../../services/table/DisableTableService";

class DisableTableController {
    async handle(req: Request, res: Response) {

        const { table_id, disable } = req.body;

        const service = new DisableTableService();

        const category = await service.execute({ table_id, disable });

        return res.json(category);
    }
}

export { DisableTableController }