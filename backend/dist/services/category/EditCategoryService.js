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
exports.EditCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class EditCategoryService {
    execute({ category_id, name, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryVerify = yield prisma_1.default.category.findFirst({
                where: {
                    id: category_id
                }
            });
            if (!categoryVerify) {
                throw new Error("Categoria não cadastrada!");
            }
            const categoryUsed = yield prisma_1.default.product.findFirst({
                where: {
                    category_id: category_id
                }
            });
            if (categoryUsed) {
                throw new Error("Categoria já associada a outros produtos, não pode ser editada!");
            }
            const category = yield prisma_1.default.category.update({
                where: {
                    id: category_id
                },
                data: {
                    name: name,
                    user_id: user_id,
                    updated_at: new Date()
                }
            });
            return category;
        });
    }
}
exports.EditCategoryService = EditCategoryService;
