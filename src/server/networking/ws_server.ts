import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";

import { serverImpl } from "../../index"
import { ActiveClient } from "../../client/client";

var clientConnections = new Map<ActiveClient, WebSocket>;

export function generateServer(id: string): WebSocketServer {
    var wsServer = new WebSocket.Server({ port:10203, host:"0.0.0.0", path: "/active/" + id });

    wsServer.on("connection", (server: WebSocket, request: IncomingMessage) => {
        var activeClient: ActiveClient = serverImpl.wsClientConnected();
        clientConnections.set(activeClient, server);

        server.on("error", console.error);

        server.on("message", async (data) => {
            serverImpl.wsDataReceived(activeClient, data);
        });

        server.on("close", () => {
            clientConnections.delete(activeClient);
            serverImpl.wsClientDisconnected(activeClient);
        });
    });

    return wsServer;
}

export function send(client: ActiveClient, data: any) {
    clientConnections.get(client)?.send(JSON.stringify(data));
}