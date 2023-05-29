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
exports.DeletePaymentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeletePaymentService {
    execute({ payment_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentBase = yield prisma_1.default.payment.findFirst({
                where: {
                    id: payment_id
                }
            });
            const order = yield prisma_1.default.order.updateMany({
                where: {
                    table_id: paymentBase.table_id,
                    paid: false
                },
                data: {
                    paid_draft: '',
                }
            });
            const payment = yield prisma_1.default.payment.delete({
                where: {
                    id: paymentBase.id
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
                    close_bill: false
                }
            });
            return "OK: Pagamento Deletado!";
        });
    }
}
exports.DeletePaymentService = DeletePaymentService;
