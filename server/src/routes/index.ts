import { Router } from "express";
import auth from "../middlewares/auth";
import { login } from "../controllers/auth.controller";
import customerRoute from "./customer.route";
import userRoute from "./user.route";

const router = Router();

router.post("/auth", login);
router.use("/customers", auth, customerRoute);
router.use("/users", auth, userRoute);

export default router;
