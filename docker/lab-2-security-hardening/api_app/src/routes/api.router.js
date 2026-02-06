import { Router } from "express";
import * as apiController from "../controllers/api.controller.js";

const router = Router();

router.get("/health", apiController.healthCheck);
router.get("/greeting", apiController.greeting);
router.get("/datetime", apiController.dateTime);
router.get("/exec-vulnerability", apiController.execCommand);

export default router;
