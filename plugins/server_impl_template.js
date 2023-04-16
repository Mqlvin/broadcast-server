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
exports.TemplateServer = void 0;
var abstract_server_1 = require("../abstract_server");
var TemplateServer = /** @class */ (function (_super) {
    __extends(TemplateServer, _super);
    function TemplateServer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplateServer.prototype.onPostInit = function () {
        console.log("Server loaded!");
    };
    TemplateServer.prototype.onDataReceive = function (client, receiveData) {
        console.log("Data received: " + receiveData);
        this.dataSendAll({ "response": "Thank you all for the data sent! totalclients:" + (this.clients.size) });
    };
    TemplateServer.prototype.onClientConnect = function (client) {
        console.log("Client connected... (" + client.id + ")");
    };
    TemplateServer.prototype.onClientDisconnect = function (uniqueId) {
        console.log("Client disconnected... (" + uniqueId + ")");
    };
    TemplateServer.prototype.onMove = function () {
        this.dataSendAll({ "moverId": "template_player_id" });
    };
    return TemplateServer;
}(abstract_server_1.Server));
exports.TemplateServer = TemplateServer;
