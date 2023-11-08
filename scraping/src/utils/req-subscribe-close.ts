import { Socket } from "net";
import { Service } from "../services/service";
import Logger from "./logger";

export function RequestSubscribeClose(socket: Socket, service: Service) {
    socket.on("close", () => {
        Logger.warn("Requisição cancelada pelo cliente. Finalizando a busca do puppeteer.");
        service.kill();
    });
}