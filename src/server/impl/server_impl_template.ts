import { Server } from "../abstract_server";
import { ActiveClient } from "../../client/client";

export class ServerImpl extends Server {
    onPostInit(): void {
        console.log("Server loaded!")
    }

    onDataReceive(client: ActiveClient, receiveData: any): void {

        try {

            if(receiveData["type"].toLowerCase() == "stats") {
                if(receiveData["data"].toLowerCase() == "totalclients") {
                    this.dataSend(client, {"type":"info", "data":{"totalClients":this.clients.size}});
                }

                if(receiveData["data"].toLowerCase() == "clientid") {
                    this.dataSend(client, {"type":"info", "data":{"clientIndex":client.index}});
                }
            }
            
            else if(receiveData["type"].toLowerCase() === "broadcast") {
                this.clients.forEach((client_: ActiveClient) => {
                    if(client != client_) { // don't send the data back to the client
                        this.dataSend(client_, {"type":"broadcast", "data":receiveData["data"]}); // send the data to all clients, provided by the sending client
                    }
                });
            }

        } catch(ex) {
            console.log(ex);
        }
        

        // console.log("Data received: " + receiveData)
        // this.dataSendAll({"response":"Thank you all for the data sent! totalclients:" + (this.clients.size)})

    }

    onClientConnect(client: ActiveClient): void {
        this.dataSendAll( {"type":"info", "data":{"type":"client/connect", "totalClients":this.clients.size}} )

        // console.log("Client connected... (" + client.id + ")");
    }

    onClientDisconnect(uniqueId: string): void {
        this.dataSendAll( {"type":"info", "data":{"type":"client/disconnect", "totalClients":this.clients.size}} )

        // console.log("Client disconnected... (" + uniqueId + ")");
    }





    onMove() {
        this.dataSendAll({"moverId":"template_player_id"});
    }

}