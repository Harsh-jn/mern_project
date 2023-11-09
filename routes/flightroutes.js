import { Router } from "express";
const router = Router();

import { createflight , getflight ,deleteflight, updateflight } from "../controllers/flightController.js";

router.route("/").post(createflight).get(getflight);

router.route("/:id").put(updateflight).delete(deleteflight);

export default router;
 