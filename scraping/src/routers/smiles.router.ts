import { Request, Response, Router } from "express";
import { SmilesService } from "../services/smiles.service";
import Logger from "../utils/logger";
import { SearchTravelRequest } from "../models/SearchTravel";

const smilesRouter = Router();

smilesRouter.post("/searchTravel", async (req: Request, res: Response) => {
    try {
        Logger.info("getting smiles travel list...");
        const travelSearch: SearchTravelRequest = req.body;

        if (!travelSearch) {
            res.status(400).send({ success: false, message: "Invalid request body." });
            return;
        }

        Logger.info(`travelSearch: ${travelSearch}`);
        const smilesService = new SmilesService();
        const result = await smilesService.search(travelSearch);
        Logger.info(`result: ${result}`);
        res.status(200).send({ success: true, data: result });
    } catch (error) {
        let message = "internal server error";
        if (error instanceof Error) {
            message = error.message;
        }
        Logger.error(message);
        res.status(500).send({ success: false, message: message });
    }
});

export default smilesRouter;
