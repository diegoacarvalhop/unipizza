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
exports.DisableCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DisableCategoryService {
    execute({ category_id, disable }) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryExist = yield prisma_1.default.category.findFirst({
                where: {
                    id: category_id
                }
            });
            if (!categoryExist) {
                throw new Error("Categoria não cadastrada!");
            }
            if (disable) {
                const productsByCategory = yield prisma_1.default.product.findMany({
                    where: {
                        category_id: category_id,
                        status: true
                    }
                });
                if (productsByCategory.length !== 0) {
                    throw new Error("É necessário desabilitar todos os produtos que estão associados nessa categoria!");
                }
            }
            const category = yield prisma_1.default.category.update({
                where: {
                    id: category_id
                },
                data: {
                    status: !disable
                }
            });
            return category;
        });
    }
}
exports.DisableCategoryService = DisableCategoryService;
