import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";

import { ActiveClient } from "../../client/client";
import { Server } from "../abstract_server";

export class WSServer {
    sv: Server;
    id: string;
    clientConnections: Map<ActiveClient, WebSocket>;
    allTimeConnections: number; // total connections of all time, resets when all connections lost

    constructor(sv: Server, id: string) {
        this.clientConnections = new Map<ActiveClient, WebSocket>;
        this.sv = sv;
        this.id = id;
        this.allTimeConnections = 0;

        this.generateServer();
    }

    generateServer(): WebSocketServer {         //                        path: "/active/" + this.id
        var wsServer = new WebSocket.Server({ port:10203, host:"0.0.0.0", path: "/active" });

        wsServer.on("connection", (server: WebSocket, request: IncomingMessage) => {
            var activeClient: ActiveClient = this.sv.wsClientConnected(this.allTimeConnections);
            this.clientConnections.set(activeClient, server);
            this.sv.onClientConnect(activeClient);
            this.allTimeConnections++;

            server.on("error", console.error);

            server.on("message", async (data) => {
                this.sv.wsDataReceived(activeClient, data);
            });

            server.on("close", () => {
                this.clientConnections.delete(activeClient);
                this.sv.wsClientDisconnected(activeClient);

                if(this.clientConnections.size == 0) {
                    this.allTimeConnections = 0;
                }
            });
        });

        return wsServer;
    }

    send(client: ActiveClient, data: any) {
        this.clientConnections.get(client)?.send(JSON.stringify(data));
    }
}
