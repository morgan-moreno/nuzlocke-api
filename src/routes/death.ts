import { Router } from "express";
import * as DeathController from "../controllers/deaths";

const router = Router();

router.get("/", DeathController.getDeaths);

export const DeathsRouter = router;
