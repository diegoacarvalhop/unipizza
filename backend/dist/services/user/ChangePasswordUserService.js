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
exports.ChangePasswordUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class ChangePasswordUserService {
    execute({ user_id, old_password, new_password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userValidate = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                }
            });
            if (!(yield (0, bcryptjs_1.compare)(old_password, userValidate.password))) {
                throw new Error('Senha antiga incorreta!');
            }
            const user = yield prisma_1.default.user.update({
                where: {
                    id: user_id
                },
                data: {
                    password: yield (0, bcryptjs_1.hash)(new_password, 8)
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    status: true
                }
            });
            return user;
        });
    }
}
exports.ChangePasswordUserService = ChangePasswordUserService;
