import express from 'express'
import cors from 'cors'

// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

export class Program {
  PORT: number;
  HOSTNAME: string;
  express: express.Application;
  
  constructor() {
    console.log("Starting program...");
    this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000
    this.HOSTNAME = process.env.HOSTNAME || 'http://localhost'
    this.express = express();

    this.loadRoutes();
  }

  loadRoutes() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use('/api', require('./routes'));
  }
}

new Program();