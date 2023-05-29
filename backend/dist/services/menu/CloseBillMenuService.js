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
exports.CloseBillMenuService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CloseBillMenuService {
    execute({ table_id, close_bill }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!close_bill) {
                const orderHasPaidDraft = yield prisma_1.default.item.findFirst({
                    where: {
                        order: {
                            table_id: table_id,
                            paid_draft: 'Y',
                            paid: false
                        }
                    }
                });
                if (orderHasPaidDraft) {
                    throw new Error('O garçom já gerou uma parcial, espere ele encerrar ou liberar a conta!');
                }
            }
            const orderIsOpen = yield prisma_1.default.item.findFirst({
                where: {
                    order: {
                        table_id: table_id,
                        paid_draft: '',
                        paid: false
                    }
                }
            });
            if (!orderIsOpen) {
                throw new Error('A mesa não possui pedidos abertos!');
            }
            const table = yield prisma_1.default.table.update({
                where: {
                    id: table_id
                },
                data: {
                    close_bill: close_bill
                }
            });
            return table;
        });
    }
}
exports.CloseBillMenuService = CloseBillMenuService;
