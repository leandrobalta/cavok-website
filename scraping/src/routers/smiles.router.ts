import { Request, Response, Router } from "express";
import { SmilesService } from "../services/smiles.service";
import Logger from "../utils/logger";
import { Travel } from "../models/Travel";

const smilesRouter = Router();

smilesRouter.post("/", async (req: Request, res: Response) => {
    Logger.info("getting smiles travel list...");
    const travelSearch: Travel = req.body; 
    
    if (!travelSearch) {
        res.status(400).send({success: false, message: "Invalid request body."});
        return;
    }

    Logger.info(`travelSearch: ${travelSearch}`);
    const smilesService = new SmilesService();
    const result = await smilesService.search(travelSearch);
    Logger.info(`result: ${result}`);
    res.status(200).send({success: true, data: result});
});

export default smilesRouter;
