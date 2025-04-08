import { Router } from "express";
import auth from "../middlewares/auth";
import { login } from "../controllers/auth.controller";
import customerRoute from "./customer.route";

const router = Router();

router.post("/auth", login)
router.use("/customers", auth, customerRoute)

export default router;