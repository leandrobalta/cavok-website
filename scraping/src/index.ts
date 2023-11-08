import express from "express";
import cors from "cors";
import routers from "./routers";
import Logger from "./utils/logger";
import { Browser } from "puppeteer";

export class Program {
    PORT: number;
    HOSTNAME: string;
    express: express.Application;
    puppeteerProcesses: Map<string, Browser>;

    constructor() {
        Logger.info("Starting program...");
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
        // i want to open my server to all my LAN
        this.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
        this.express = express();
        this.puppeteerProcesses = new Map();
        this.start();
    }

    loadRoutes() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(routers);
    }

    start() {
        this.loadRoutes();
        this.express.listen(this.PORT, this.HOSTNAME, () => {
            Logger.info(`Server running at http://${this.HOSTNAME}:${this.PORT}`);
        });
    }
}

export const program = new Program();
