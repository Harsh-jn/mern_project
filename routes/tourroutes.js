import { Router } from "express";
const router = Router();

import { createtour, deleteTour, getTour, updateTour } from "../controllers/tourController.js";

router.route("/").post(createtour).get(getTour);

router.route("/:id").delete(deleteTour).put(updateTour);

export default router;