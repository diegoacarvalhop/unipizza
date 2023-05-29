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
exports.SendOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class SendOrderService {
    execute({ order_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma_1.default.order.update({
                where: {
                    id: order_id
                },
                data: {
                    draft: false
                }
            });
            const table = yield prisma_1.default.order.findFirst({
                where: {
                    id: order_id
                },
                select: {
                    table_id: true
                }
            });
            yield prisma_1.default.table.update({
                where: {
                    id: table.table_id
                },
                data: {
                    free: false
                }
            });
            return order;
        });
    }
}
exports.SendOrderService = SendOrderService;