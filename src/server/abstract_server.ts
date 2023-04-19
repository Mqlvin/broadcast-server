import { makeRandomId } from "../util/id_util";
import { ActiveClient } from "../client/client";
import { WSServer } from "./networking/ws_server";

const serverIdLength: number = 8;
const clientIdLength: number = 24;


export abstract class Server {
    id: string;
    clients: Map<string, ActiveClient>;
    websocketServer: WSServer;

    constructor() {
        this.id = makeRandomId(serverIdLength);
        this.clients = new Map<string, ActiveClient>;

        this.websocketServer = new WSServer(this, this.id);
    }

    wsDataReceived(client: ActiveClient, data: any) {
        try {
            this.onDataReceive(client, JSON.parse(data));
        } catch(ex) {
            // probably not valid JSON, we shall just ignore
            console.log(ex)
        }   
    }

    wsClientConnected(clientIndex: number): ActiveClient {
        var uniqueId: string = "";

        while(uniqueId == "" || this.clients.has(uniqueId)) { // In almost every case this will only have to iterate once.
            uniqueId = makeRandomId(clientIdLength);
        }

        var newClient: ActiveClient = new ActiveClient(uniqueId, clientIndex);

        this.clients.set(uniqueId, newClient);
        // this.onClientConnect(newClient);
        // Moved to being handled in the ws_server.ts

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
        this.websocketServer.send(client, sendData);
    }

    dataSendAll(sendData: any): void {
        this.getAllClients().forEach((client: ActiveClient) => {
            this.websocketServer.send(client, sendData);
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