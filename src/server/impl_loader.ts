/*
    This class handles dynamic loading of server implementations, and creating the server objects and their appropriate websockets.
*/

import { Server } from "./abstract_server";



var pluginDirPath: string = __dirname + "/impl"



/* returns a number code for the ID (used by players to join a session, similar to kahoot / blooket) */
export function createServer(name: string): number {
    var implDepend = undefined;
    try {

        implDepend = require(pluginDirPath + "/" + name).ServerImpl;

    } catch (exception) {

        console.log("Unable to load plugin by the name of \"" + name + "\".js")

    }   

    if(implDepend == undefined) {
        // server impl didn't exist
        return -1;
    }

    let ServerImpl = new implDepend();

    console.log("Websocket initialised... (/active/" + ServerImpl.id + ")")

    return 1234;
}