import { Router } from "express";
import validation from "../middlewares/validation";
import { customerCreateSchema } from "../schemas/customer.schema";
import { updateCustomer, createCustomer, getAllCustomers } from "../controllers/customer.controller";

const router = Router();

router.get("/", getAllCustomers);
router.post("/", validation(customerCreateSchema), createCustomer)
router.put("/:id", updateCustomer)

export default router;