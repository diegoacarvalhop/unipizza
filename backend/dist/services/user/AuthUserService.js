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
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const email_validator_1 = require("email-validator");
class AuthUserService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar o e-mail
            if (!email) {
                throw new Error("E-mail obrigatório!");
            }
            if (!(0, email_validator_1.validate)(email)) {
                throw new Error("E-mail inválido!");
            }
            //Verificar o password
            if (!password) {
                throw new Error("Senha obrigatória!");
            }
            // Verificar se o e-mail existe
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Usuário não encontrado!");
            }
            //Verificar se a senha está incorreta
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error("Senha incorreta!");
            }
            if (!user.status) {
                throw new Error('Usuário desabilitado!');
            }
            yield prisma_1.default.user.update({
                where: {
                    id: user.id
                },
                data: {
                    is_logged: true
                }
            });
            //Se deu tudo certo, vamos gerar o token pro usuário
            const token = (0, jsonwebtoken_1.sign)({
                nane: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '30d'
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
