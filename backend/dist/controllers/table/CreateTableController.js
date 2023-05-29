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
exports.CreateTableController = void 0;
const CreateTableService_1 = require("../../services/table/CreateTableService");
class CreateTableController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number } = req.body;
            const user_id = req.user_id;
            const service = new CreateTableService_1.CreateTableService();
            const table = yield service.execute({ number, user_id });
            return res.json(table);
        });
    }
}
exports.CreateTableController = CreateTableController;
