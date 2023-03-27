"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var client_Router_1 = __importDefault(require("./routers/client-Router"));
var app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .get("/hello", function (req, res) { return res.send("Hello!"); })
    .use("/cliente", client_Router_1.default);
app.listen(4000, function () {
    console.log("It's alive in 4000...");
});
