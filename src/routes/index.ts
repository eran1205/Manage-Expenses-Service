import { Router } from "express";
import { HomeController, appKeyValidator } from "@/components/home";
import { ProduceMessageController } from "@/components/produce-messages";

import { sanitizer } from "@/helpers";

const router = Router();

router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

// Produce-Message routes
router.get(
  "/produceMessage",
  sanitizer(appKeyValidator),
  ProduceMessageController.getAppInfo,
);

export default router;
