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
exports.FinishPaymentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class FinishPaymentService {
    execute({ payment_id, debit, credit, pix, money, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.default.payment.update({
                where: {
                    id: payment_id
                },
                data: {
                    amount_paid: (Number(debit) + Number(credit) + Number(pix) + Number(money)).toString(),
                    amount_debit: debit,
                    amount_credit: credit,
                    amount_pix: pix,
                    amount_money: money,
                    user_id: user_id
                },
                select: {
                    table_id: true
                }
            });
            const table = yield prisma_1.default.table.update({
                where: {
                    id: payment.table_id
                },
                data: {
                    free: true,
                    close_bill: false
                }
            });
            const order = yield prisma_1.default.order.updateMany({
                where: {
                    table_id: payment.table_id,
                    paid_draft: 'Y'
                },
                data: {
                    paid: true
                }
            });
            return "OK: Pagamento realizado!";
        });
    }
}
exports.FinishPaymentService = FinishPaymentService;
