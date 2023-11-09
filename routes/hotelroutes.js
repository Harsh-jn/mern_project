import { Router } from "express";
const router = Router();

import { createhotel, deletehotel, gethotel, updatehotel } from "../controllers/hotelController.js";

router.route("/").post(createhotel).get(gethotel);
router.route("/:id").put(updatehotel).delete(deletehotel);


export default router;