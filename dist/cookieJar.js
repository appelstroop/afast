"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gFetch = exports.jar = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var tough_cookie_1 = __importDefault(require("tough-cookie"));
var jar = new tough_cookie_1.default.CookieJar();
exports.jar = jar;
var node_fetch_2 = __importDefault(require("fetch-cookie/node-fetch"));
var gFetch = node_fetch_2.default(node_fetch_1.default, jar);
exports.gFetch = gFetch;
//# sourceMappingURL=cookieJar.js.map