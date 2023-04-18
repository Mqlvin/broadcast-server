"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerImpl = void 0;
var abstract_server_1 = require("../src/server/abstract_server");
var ServerImpl = /** @class */ (function (_super) {
    __extends(ServerImpl, _super);
    function ServerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerImpl.prototype.onPostInit = function () {
        console.log("Server loaded!");
    };
    ServerImpl.prototype.onDataReceive = function (client, receiveData) {
        console.log("Data received: " + receiveData);
        this.dataSendAll({ "response": "Thank you all for the data sent! totalclients:" + (this.clients.size) });
    };
    ServerImpl.prototype.onClientConnect = function (client) {
        console.log("Client connected... (" + client.id + ")");
    };
    ServerImpl.prototype.onClientDisconnect = function (uniqueId) {
        console.log("Client disconnected... (" + uniqueId + ")");
    };
    ServerImpl.prototype.onMove = function () {
        this.dataSendAll({ "moverId": "template_player_id" });
    };
    return ServerImpl;
}(abstract_server_1.Server));
exports.ServerImpl = ServerImpl;
