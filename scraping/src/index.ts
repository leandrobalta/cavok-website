import express from 'express'
import cors from 'cors'
import routers from './routers';
import Logger from './utils/logger';

export class Program {
  PORT: number;
  HOSTNAME: string;
  express: express.Application;
  
  constructor() {
    Logger.info("Starting program...");
    this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000
    this.HOSTNAME = process.env.HOSTNAME || 'http://localhost'
    this.express = express();

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
    this.express.listen(this.PORT, () => {
      Logger.info(`Server listening on ${this.HOSTNAME}:${this.PORT}`);
    });
  }
}

new Program();