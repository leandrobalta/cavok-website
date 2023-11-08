import { Request, Response, Router } from "express";
import { SmilesService } from "../services/smiles.service";
import Logger from "../utils/logger";
import { SearchTravelRequest } from "../models/SearchTravel";
import { RequestSubscribeClose } from "../utils/req-subscribe-close";

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

        const key = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
        Logger.info(`[RECEIVE] key: ${key}`);
        const smilesService = new SmilesService(`${req.socket.remoteAddress}:${req.socket.remotePort}`);
        
        RequestSubscribeClose(req.socket, smilesService);

        const result = await smilesService.search(travelSearch);
    
        const response = {
            success: true,
            data: result
        };
        Logger.info(`[SEND] response: ${response}`);
        res.status(200).send(response);
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
