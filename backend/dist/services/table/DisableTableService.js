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
exports.DisableTableService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DisableTableService {
    execute({ table_id, disable }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableExist = yield prisma_1.default.table.findFirst({
                where: {
                    id: table_id
                }
            });
            if (!tableExist) {
                throw new Error("Mesa não cadastrada!");
            }
            if (!tableExist.free) {
                throw new Error("Mesa ocupada, não pode ser desabilitada!");
            }
            const table = yield prisma_1.default.table.update({
                where: {
                    id: table_id
                },
                data: {
                    status: !disable
                }
            });
            return table;
        });
    }
}
exports.DisableTableService = DisableTableService;
