import express from "express";
import type {Application, Response, Request} from "express";
import userRoute from "./modules/user/user.route";
import {errorHandler} from "./middleware/error.middleware";
import roleRoute from "./modules/role/role.route";
import userRoleRoute from "./modules/user-role/user-role.route";
import authRoute from "./modules/auth/auth.route";

const app: Application = express();
app.use(express.json());

app.use('/user', userRoute);
app.use('/role', roleRoute);
app.use('/auth', authRoute);
app.use('/assign-role', userRoleRoute);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to back-end...");
})

export default app;