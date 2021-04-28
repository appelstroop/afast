var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import arg from "arg";
import inquirer from "inquirer";
import authRequests from "./login/authRequests";
import confirm2FA from "./login/confirm2FA";
import emailRequest from "./login/emailRequest";
import passwordRequest from "./login/passwordRequest";
import twoFAMethodRequest from "./login/twoFAMethodRequest";
import { fetch } from "node-fetch-cookies";
import { jar } from "./cookieJar";
import getCookie from "./login/getCookie";
import getSecureToken from "./hours/getSecureToken";
import getProjects from "./hours/getProjects";
function parseArgumentsIntoOptions(rawArgs) {
    var args = arg({
        "--git": Boolean,
        "--yes": Boolean,
        "--install": Boolean,
        "-g": "--git",
        "-y": "--yes",
        "-i": "--install",
    }, {
        argv: rawArgs.slice(2),
    });
    console.log("ARGS", args);
    return {
        skipPrompts: args["--yes"] || false,
        git: args["--git"] || false,
        template: args._[0],
        runInstall: args["--install"] || false,
        login: args._[0] === "login" ? true : false,
    };
}
function promptForMissingOptions(options) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultTemplate, questions, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultTemplate = "JavaScript";
                    if (options.skipPrompts) {
                        return [2 /*return*/, __assign(__assign({}, options), { template: options.template || defaultTemplate })];
                    }
                    questions = [];
                    if (!options.template) {
                        questions.push({
                            type: "list",
                            name: "template",
                            message: "Please choose which project template to use",
                            choices: ["JavaScript", "TypeScript"],
                            default: defaultTemplate,
                        });
                    }
                    if (!options.git) {
                        questions.push({
                            type: "confirm",
                            name: "git",
                            message: "Initialize a git repository?",
                            default: false,
                        });
                    }
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, options), { template: options.template || answers.template, git: options.git || answers.git })];
            }
        });
    });
}
function asyncPipe() {
    var _this = this;
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (x) { return fns.reduce(function (y, fn) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = fn;
                return [4 /*yield*/, y];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    }); }); }, x); };
}
var askLoginQuestions = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt([
                    { name: "email", message: "What is your email?" },
                    {
                        name: "password",
                        message: "What is your password?",
                        type: "password",
                        mask: true,
                    },
                    {
                        type: "list",
                        name: "method",
                        message: "How would you like to login?",
                        choices: [
                            { name: "SMS", value: "sms" },
                            { name: "Pocket app (not yet supported)", value: "app" },
                        ],
                        default: "sms",
                        loop: false,
                    },
                ])];
            case 1:
                answers = _a.sent();
                return [2 /*return*/, answers];
        }
    });
}); };
var askForVerificationToken = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt([
                    {
                        name: "code",
                        message: "Type the code you received:",
                    },
                ])];
            case 1:
                answers = _a.sent();
                return [2 /*return*/, __assign(__assign({}, data), answers)];
        }
    });
}); };
var loginPipe = asyncPipe(askLoginQuestions, authRequests, emailRequest, passwordRequest, twoFAMethodRequest, askForVerificationToken, confirm2FA);
export function cli(args) {
    return __awaiter(this, void 0, void 0, function () {
        var login, _a, id, secure, projects, _b, project, hours, today, day, month, year, json, bloeh;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    login = parseArgumentsIntoOptions(args).login;
                    //if (login) await loginPipe();
                    return [4 /*yield*/, getCookie()];
                case 1:
                    //if (login) await loginPipe();
                    _c.sent();
                    return [4 /*yield*/, getSecureToken()];
                case 2:
                    _a = _c.sent(), id = _a.id, secure = _a.secure;
                    if (!(!id || !secure || login)) return [3 /*break*/, 4];
                    console.log("logging in");
                    return [4 /*yield*/, loginPipe()];
                case 3:
                    _c.sent();
                    console.log("You are logged in :)");
                    cli([]);
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, getProjects({ id: id, secure: secure })];
                case 5:
                    projects = _c.sent();
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                name: "project",
                                type: "list",
                                choices: projects.projects.map(function (p) { return ({
                                    name: p.name,
                                    value: p.code,
                                }); }),
                                loop: false,
                            },
                            { name: "hours", type: "number" },
                        ])];
                case 6:
                    _b = _c.sent(), project = _b.project, hours = _b.hours;
                    today = new Date();
                    day = today.getDate();
                    month = new Date().getMonth() + 1;
                    year = new Date().getFullYear();
                    json = "{\"eventType\":\"create\",\"moment\":{\"day\":" + day + ",\"month\":\"" + month + "\",\"year\":\"" + year + "\"},\"user\":{\"name\":\"Jasper Hoving\",\"id\":\"" + id + "\",\"secure\":\"" + secure + "\",\"see\":\"false\"},\"project\":\"" + project + "\",\"wst\":\"100\",\"_lines\":[{\"desc\":\"\",\"time\":" + hours + "}]}";
                    bloeh = {
                        eventType: "create",
                        moment: {
                            day: 16,
                            month: "4",
                            year: "2021",
                        },
                        user: {
                            name: "Jasper Hoving",
                            id: id,
                            secure: secure,
                            see: false,
                        },
                        project: "5115",
                        wst: "100",
                        _lines: {
                            desc: "",
                            time: 8,
                        },
                    };
                    return [4 /*yield*/, fetch(jar, "https://x3.nodum.io/json/update", {
                            headers: {
                                "content-type": "multipart/form-data; boundary=----WebKitFormBoundary98yEVAsfukRofPMV",
                            },
                            body: "------WebKitFormBoundary98yEVAsfukRofPMV\r\nContent-Disposition: form-data; name=\"json\"\r\n\r\n" + json + "\r\n------WebKitFormBoundary98yEVAsfukRofPMV--\r\n",
                            method: "POST",
                            mode: "cors",
                        })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map