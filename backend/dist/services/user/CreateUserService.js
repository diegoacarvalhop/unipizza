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
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const email_validator_1 = require("email-validator");
class CreateUserService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            //console.log(emailRegexp.test(email));
            //Verificar o nome
            if (!name) {
                throw new Error("Nome obrigatório!");
            }
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
            if (password.length <= 5) {
                throw new Error("A senha tem que ter no mínimo 6 caracteres!");
            }
            //Verificar se o e-mail já está cadastrado
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error("Já existe um usuário cadastrado com este e-mail!");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
