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
exports.EditProductController = void 0;
const EditProductService_1 = require("../../services/product/EditProductService");
class EditProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id, name, price, description, category_id } = req.body;
            const user_id = req.user_id;
            const service = new EditProductService_1.EditProductService();
            if (!req.file) {
                throw new Error("Error upload file!");
            }
            else {
                const { filename: banner } = req.file;
                const product = yield service.execute({ product_id, name, price, description, banner, category_id, user_id });
                return res.json(product);
            }
        });
    }
}
exports.EditProductController = EditProductController;
