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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishPaymentController = void 0;
const FinishPaymentService_1 = require("../../services/payment/FinishPaymentService");
class FinishPaymentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { payment_id, debit, credit, pix, money } = req.body;
            const user_id = req.user_id;
            const service = new FinishPaymentService_1.FinishPaymentService();
            const category = yield service.execute({ payment_id, debit, credit, pix, money, user_id });
            return res.json(category);
        });
    }
}
exports.FinishPaymentController = FinishPaymentController;
