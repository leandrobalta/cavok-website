import { Router } from "express";
import { SmilesService } from "../services/smiles.service";
import Logger from "../utils/logger";

const smilesRouter = Router();

smilesRouter.get("/", async (req, res) => {
    Logger.info("GET /smiles");
    const smilesService = new SmilesService();
    const result = await smilesService.search();
    Logger.info("smiles router result: ", result);
    res.status(200).send({success: true, data: result});
});

export default smilesRouter;
