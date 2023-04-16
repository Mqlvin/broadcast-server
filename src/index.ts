import { makeRandomId } from "./util/id_util"
import { generateServer } from "./server/networking/ws_server";

console.log("Here... " + (__dirname + "/../plugins/server_impl_template"))

const TemplateServer = require(__dirname + "/server/impl/server_impl_template").TemplateServer;




export let serverImpl = new TemplateServer();
console.log("Server implementation instance created...")

generateServer(serverImpl.id);
console.log("Websocket initialised... (/active/" + serverImpl.id + ")")


// then, you can start the websocket