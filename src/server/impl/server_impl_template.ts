import { Server } from "../abstract_server";
import { ActiveClient } from "../../client/client";

export class TemplateServer extends Server {
    onPostInit(): void {
        console.log("Server loaded!")
    }

    onDataReceive(client: ActiveClient, receiveData: any): void {

        console.log("Data received: " + receiveData)
        this.dataSendAll({"response":"Thank you all for the data sent! totalclients:" + (this.clients.size)})

    }

    onClientConnect(client: ActiveClient): void {
        console.log("Client connected... (" + client.id + ")");
    }

    onClientDisconnect(uniqueId: string): void {
        console.log("Client disconnected... (" + uniqueId + ")");
    }





    onMove() {
        this.dataSendAll({"moverId":"template_player_id"});
    }

}