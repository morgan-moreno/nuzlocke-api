import { Router } from "express";
import * as InclementEmeraldController from "../controllers/inclementEmerald";

const router = Router();

// ENCOUNTERS
const encountersRouter = Router();
encountersRouter.get(
  "/",
  InclementEmeraldController.getAllEncountersForActiveAttempt
);
encountersRouter.get(
  "/:encounterId",
  InclementEmeraldController.getEncounterById
);
encountersRouter.post(
  "/",
  InclementEmeraldController.createEncounterForActiveAttempt
);
encountersRouter.put(
  "/:encounterId/kill",
  InclementEmeraldController.killEncounterForActiveAttempt
);
encountersRouter.put(
  "/:encounterId",
  InclementEmeraldController.updateEncounterForActiveAttempt
);

// DEATHS
const deathsRouter = Router();

deathsRouter.get("/", InclementEmeraldController.getDeaths);

// ATTEMPTS
const attemptsRouter = Router();

attemptsRouter.get("/", InclementEmeraldController.getAttempts);
attemptsRouter.post("/", InclementEmeraldController.createAttempt);
attemptsRouter.put("/:attemptId", InclementEmeraldController.updateAttempt);

router.use("/attempts", attemptsRouter);
router.use("/deaths", deathsRouter);
router.use("/encounters", encountersRouter);
export default router;
