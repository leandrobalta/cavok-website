import express from "express";
import cors from "cors";
import routers from "./routers";
import Logger from "./utils/logger";
import { Browser } from "puppeteer";
import SocketIo from 'socket.io';



export class Program {
    PORT: number;
    HOSTNAME: string;
    express: express.Application;
    puppeteerProcesses: Map<any, Browser>;

    constructor() {
        Logger.info("Starting program...");
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
        // i want to open my server to all my LAN
        this.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
        this.express = express();
        this.puppeteerProcesses = new Map();
        this.loadRoutes();
        
        const server = this.express.listen(this.PORT, this.HOSTNAME, () => {
            Logger.info(`Server running at http://${this.HOSTNAME}:${this.PORT}`);
        });

        // const io = SocketIo(server);


        // io.on('connection', (socket) => {
        //     Logger.info(`Usuário conectado: ${socket.id}`);

        //     // Manipular desconexões
        //     socket.on('disconnect', () => {
        //         Logger.warn(`Usuário desconectado: ${socket.id}`);
        //     });
        // });
    }

    loadRoutes() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(routers);
    }

    start() {
        
    }
}

export const program = new Program();
