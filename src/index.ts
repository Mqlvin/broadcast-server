import { createServer } from "./server/impl_loader";


// const TemplateServer = require(__dirname + "/server/impl/server_impl_template").TemplateServer;



createServer("server_impl_template");

// export let serverImpl = new TemplateServer();
// console.log("Server implementation instance created...")
// 
// generateServer(serverImpl.id);
// console.log("Websocket initialised... (/active/" + serverImpl.id + ")")


// then, you can start the websocket