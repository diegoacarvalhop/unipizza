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
exports.CreatePaymentController = void 0;
const CreatePaymentService_1 = require("../../services/payment/CreatePaymentService");
class CreatePaymentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const table_id = req.query.table_id;
            const user_id = req.user_id;
            const service = new CreatePaymentService_1.CreatePaymentService();
            const payment = yield service.execute({ table_id, user_id });
            return res.json(payment);
        });
    }
}
exports.CreatePaymentController = CreatePaymentController;
