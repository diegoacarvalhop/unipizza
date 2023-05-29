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
exports.ListTableMenuController = void 0;
const ListTableMenuService_1 = require("../../services/menu/ListTableMenuService");
class ListTableMenuController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = req.query.table;
            const service = new ListTableMenuService_1.ListTableMenuService();
            const getTable = yield service.execute({ table });
            return res.json(getTable);
        });
    }
}
exports.ListTableMenuController = ListTableMenuController;
