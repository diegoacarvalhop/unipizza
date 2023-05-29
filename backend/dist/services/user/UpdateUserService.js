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
exports.UpdateUserService = void 0;
const email_validator_1 = require("email-validator");
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateUserService {
    execute({ user_id, name, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdate = {
                user_id: user_id,
                name: name,
                email: email,
            };
            const userBase = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            if (!(0, email_validator_1.validate)(email)) {
                throw new Error("E-mail inválido!");
            }
            if (JSON.stringify(userUpdate) === JSON.stringify(userBase)) {
                return "Nada para atualizar!";
            }
            else {
                const user = yield prisma_1.default.user.update({
                    where: {
                        id: user_id
                    },
                    data: {
                        name: name,
                        email: email,
                        updated_at: new Date()
                    }
                });
                return user;
            }
        });
    }
}
exports.UpdateUserService = UpdateUserService;
