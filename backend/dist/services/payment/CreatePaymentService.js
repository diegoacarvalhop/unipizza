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
exports.CreatePaymentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreatePaymentService {
    execute({ table_id, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    table_id: table_id,
                    paid_draft: ''
                }
            });
            const orders_id = [];
            orders.forEach((item) => {
                orders_id.push(item.id);
            });
            const items = yield prisma_1.default.item.groupBy({
                by: ['product_id'],
                _sum: {
                    amount: true
                },
                where: {
                    order_id: {
                        in: orders_id
                    }
                }
            });
            for (let x = 0; x < orders_id.length; x++) {
                yield prisma_1.default.order.update({
                    where: {
                        id: orders_id[x]
                    },
                    data: {
                        paid_draft: "Y"
                    }
                });
            }
            const itemsCloseBill = [];
            let totalBill = 0;
            for (let x = 0; x < items.length; x++) {
                const product = yield prisma_1.default.product.findFirst({
                    where: {
                        id: items[x].product_id
                    }
                });
                const itemAdd = {
                    id: items[x].product_id,
                    amount: items[x]._sum.amount,
                    name: product.name,
                    price: product.price
                };
                itemsCloseBill.push(itemAdd);
                totalBill = totalBill + (items[x]._sum.amount * Number(product.price));
            }
            const payment = yield prisma_1.default.payment.create({
                data: {
                    table_id: table_id,
                    total_amount: totalBill.toString(),
                    user_id: user_id
                },
                select: {
                    id: true
                }
            });
            return { itemsCloseBill, totalBill, payment };
        });
    }
}
exports.CreatePaymentService = CreatePaymentService;
