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
exports.DisableProductController = void 0;
const DisableProductService_1 = require("../../services/product/DisableProductService");
class DisableProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id, disable } = req.body;
            const user_id = req.user_id;
            const service = new DisableProductService_1.DisableProductService();
            const product = yield service.execute({ product_id, disable, user_id });
            return res.json(product);
        });
    }
}
exports.DisableProductController = DisableProductController;
