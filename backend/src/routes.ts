import { Router, Request, Response } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { FindCategoryController } from "./controllers/category/FindCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { DisableCategoryController } from "./controllers/category/DisableCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from './config/multer';
import { FindProductController } from "./controllers/product/FindProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { ListProductController } from "./controllers/product/ListProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { DisableProductController } from "./controllers/product/DisableProductController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { ShowOrderDetailController } from "./controllers/order/ShowOrderDetailController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { CreateTableController } from "./controllers/table/CreateTableController";
import { ListProductsMenuController } from "./controllers/menu/ListProductsMenuController";
import { ListCategoryMenuController } from "./controllers/menu/ListCategoryMenuController";
import { ListTableMenuController } from "./controllers/menu/ListTableMenuController";
import { ListTableController } from "./controllers/table/ListTableController";
import { BusyTableController } from "./controllers/table/BusyTableController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Rotas USER
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

//Rotas TABLE
router.post('/table', isAuthenticated, new CreateTableController().handle);
router.get('/tables', isAuthenticated, new ListTableController().handle);
router.put('/table/busy', isAuthenticated, new BusyTableController().handle);

//Rotas CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);
router.get('/categories/menu', new ListCategoryMenuController().handle);
router.get('/category', isAuthenticated, new FindCategoryController().handle);
router.put('/category/update', isAuthenticated, new EditCategoryController().handle);
router.put('/category/disable', isAuthenticated, new DisableCategoryController().handle);

//Rotas PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/product', isAuthenticated, new FindProductController().handle);
router.get('/product/bycategory', isAuthenticated, new ListByCategoryController().handle);
router.get('/products', isAuthenticated, new ListProductController().handle);
router.put('/product/update', isAuthenticated, new EditProductController().handle);
router.put('/product/disable', isAuthenticated, new DisableProductController().handle);

//Rotas ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new DeleteOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrderController().handle);
router.get('/order/show', isAuthenticated, new ShowOrderDetailController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

//Rotas MENU
router.get('/menu/products', new ListProductsMenuController().handle);
router.get('/menu/categories', new ListCategoryMenuController().handle);
router.get('/menu/table', new ListTableMenuController().handle);

export { router };