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
exports.CloseBillMenuController = void 0;
const CloseBillMenuService_1 = require("../../services/menu/CloseBillMenuService");
class CloseBillMenuController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table_id, close_bill } = req.body;
            const service = new CloseBillMenuService_1.CloseBillMenuService();
            const table = yield service.execute({ table_id, close_bill });
            return res.json(table);
        });
    }
}
exports.CloseBillMenuController = CloseBillMenuController;
