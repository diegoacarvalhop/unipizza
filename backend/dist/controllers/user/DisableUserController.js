"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableUserController = void 0;
const DisableUserService_1 = require("../../services/user/DisableUserService");
class DisableUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, disable } = req.body;
            const user_id_body = req.user_id;
            const service = new DisableUserService_1.DisableUserService();
            const user = yield service.execute({ user_id, disable, user_id_body });
            return res.json(user);
        });
    }
}
exports.DisableUserController = DisableUserController;
