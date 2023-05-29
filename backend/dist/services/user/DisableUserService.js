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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DisableUserService {
    execute({ user_id, disable, user_id_body }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user_id === user_id_body) {
                throw new Error('Você não pode desabilitar seu próprio usuário!');
            }
            const userBase = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                }
            });
            if (userBase.is_logged) {
                throw new Error('O usuário está logado!');
            }
            const user = yield prisma_1.default.user.update({
                where: {
                    id: user_id
                },
                data: {
                    status: !disable,
                    updated_at: new Date()
                }
            });
            return user;
        });
    }
}
exports.DisableUserService = DisableUserService;
