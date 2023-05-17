import { Request, Response } from "express";
import { DisableUserService } from "../../services/user/DisableUserService";

class DisableUserController {
    async handle(req: Request, res: Response) {

        const { user_id, disable } = req.body;

        const service = new DisableUserService();

        const user = await service.execute({ user_id, disable });

        return res.json(user);
    }
}

export { DisableUserController }