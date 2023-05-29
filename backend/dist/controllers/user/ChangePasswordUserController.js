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
exports.ChangePasswordUserController = void 0;
const ChangePasswordUserService_1 = require("../../services/user/ChangePasswordUserService");
class ChangePasswordUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, old_password, new_password } = req.body;
            const service = new ChangePasswordUserService_1.ChangePasswordUserService();
            const user = yield service.execute({ user_id, old_password, new_password });
            return res.json(user);
        });
    }
}
exports.ChangePasswordUserController = ChangePasswordUserController;
