import { Router } from "express";
import * as AttemptController from "../controllers/attempts";

const router = Router();

router.get("/", AttemptController.getAttempts);

router.post("/", AttemptController.createAttempt);

router.put("/:attemptId", AttemptController.updateAttempt);

export const AttemptRouter = router;
