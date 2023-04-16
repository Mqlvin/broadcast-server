import { makeRandomId } from "../util/id_util";
import { ActiveClient } from "../client/client";
import { send } from "./networking/ws_server";

const serverIdLength: number = 8;
const clientIdLength: number = 24;


export abstract class Server {
    id: string;
    clients: Map<string, ActiveClient>;

    constructor() {
        this.id = makeRandomId(serverIdLength);
        this.clients = new Map<string, ActiveClient>;
    }

    wsDataReceived(client: ActiveClient, data: any) {
        this.onDataReceive(client, data);
    }

    wsClientConnected(): ActiveClient {
        var uniqueId: string = "";

        while(uniqueId == "" || this.clients.has(uniqueId)) { // In almost every case this will only have to iterate once.
            uniqueId = makeRandomId(clientIdLength);
        }

        var newClient: ActiveClient = new ActiveClient(uniqueId);

        this.clients.set(uniqueId, newClient);
        this.onClientConnect(newClient);

        return newClient;
    }

    wsClientDisconnected(client: ActiveClient) {
        var uniqueId: string = client.id;

        this.clients.delete(uniqueId); // remove the `ActiveClient` object from the list of clients

        this.onClientDisconnect(uniqueId);
    }

    



    /*
        ServerImpl abstract functions.
        All functions implemented by the ServerImpl class.
    */

    abstract onPostInit(): void;
    abstract onDataReceive(client: ActiveClient, receiveData: any): void;
    abstract onClientConnect(client: ActiveClient): void;
    abstract onClientDisconnect(uniqueId: string): void;
    



    /*
        ServerImpl functions.
        All functions used by the ServerImpl class.
    */

    dataSend(client: ActiveClient, sendData: any): void {
        send(client, sendData);
    }

    dataSendAll(sendData: any): void {
        console.log("starting")
        this.getAllClients().forEach((client: ActiveClient) => {
            console.log("sending response to all clients...")
            send(client, sendData);
        });
    }

    getClientObject(clientId: string): ActiveClient | undefined {
        return this.clients.get(clientId);
    }

    getAllClients(): Array<ActiveClient> {
        var clients: Array<ActiveClient> = new Array<ActiveClient>;
        
        this.clients.forEach((client: ActiveClient) => {
            clients.push(client);
        });

        return clients;
    }

    close(): void {

    }
}