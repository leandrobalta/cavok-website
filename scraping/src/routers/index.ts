import { Router } from "express";
import smilesRouter from "./smiles.router";

const routers = Router();

routers.use("/smiles", smilesRouter);

export default routers;