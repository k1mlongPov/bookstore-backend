import express from "express";
import type {Application, Response, Request} from "express";
import userRoute from "./modules/user/user.route";
import {errorHandler} from "./middleware/error.middleware";
import roleRoute from "./modules/role/role.route";
import userRoleRoute from "./modules/user-role/user-role.route";
import authRoute from "./modules/auth/auth.route";
import permissionRoute from "./modules/permission/permission.route";
import rolePermissionRoute from "./modules/role-permission/role-permission.route";
import publisherRoute from "./modules/publisher/publisher.route";
import categoryRoute from "./modules/category/category.route";

const app: Application = express();
app.use(express.json());

app.use('/user', userRoute);
app.use('/role', roleRoute);
app.use('/auth', authRoute);
app.use('/user-role', userRoleRoute);
app.use('/permission', permissionRoute);
app.use('/role-permission', rolePermissionRoute);
app.use('/publisher', publisherRoute);
app.use('/category', categoryRoute);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to back-end...");
})

export default app;