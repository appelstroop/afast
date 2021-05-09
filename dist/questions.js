"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aksForUpdate = exports.askForDescription = exports.askForProjectAndHours = exports.askForVerificationToken = exports.askLoginQuestions = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var askLoginQuestions = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                questions = [];
                if (!data.email) {
                    questions.push({ name: 'email', message: 'What is your email?' });
                }
                if (!data.password) {
                    questions.push({
                        name: 'password',
                        message: 'What is your password?',
                        type: 'password',
                        mask: true,
                    });
                }
                return [4 /*yield*/, inquirer_1.default.prompt(__spreadArray(__spreadArray([], questions), [
                        {
                            type: 'list',
                            name: 'method',
                            message: 'How would you like to login?',
                            choices: [
                                { name: 'SMS', value: 'sms' },
                                { name: 'Pocket app (not yet supported)', value: 'app' },
                            ],
                            default: 'sms',
                            loop: false,
                        },
                    ]))];
            case 1:
                answers = _a.sent();
                return [2 /*return*/, __assign(__assign({}, data), answers)];
        }
    });
}); };
exports.askLoginQuestions = askLoginQuestions;
var askForVerificationToken = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        name: 'code',
                        message: 'Type the code you received:',
                    },
                ])];
            case 1:
                answers = _a.sent();
                return [2 /*return*/, __assign(__assign({}, data), answers)];
        }
    });
}); };
exports.askForVerificationToken = askForVerificationToken;
var askForProjectAndHours = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                questions = [];
                if (!data.projectCode) {
                    questions.push({
                        name: 'projectCode',
                        message: 'Selelect project:',
                        type: 'list',
                        choices: data.projects.map(function (p) { return ({
                            name: p.name + " (" + p.code + ") ",
                            value: p.code,
                        }); }),
                        loop: false,
                    });
                }
                if (!data.hours)
                    questions.push({
                        name: 'hours',
                        type: 'number',
                        message: 'Working hours today',
                    });
                return [4 /*yield*/, inquirer_1.default.prompt(questions)];
            case 1:
                answers = _a.sent();
                return [2 /*return*/, __assign(__assign({}, data), answers)];
        }
    });
}); };
exports.askForProjectAndHours = askForProjectAndHours;
var askForDescription = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                questions = [];
                if (data.project.internal) {
                    questions.push({
                        name: 'description',
                        message: 'This is an internal project. Write a description:',
                    });
                }
                return [4 /*yield*/, inquirer_1.default.prompt(questions)];
            case 1:
                answers = _a.sent();
                return [2 /*return*/, __assign(__assign({}, data), answers)];
        }
    });
}); };
exports.askForDescription = askForDescription;
var aksForUpdate = function () { return __awaiter(void 0, void 0, void 0, function () {
    var anwsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        name: 'update',
                        type: 'confirm',
                        message: 'New version available, would you like to update?',
                    },
                ])];
            case 1:
                anwsers = _a.sent();
                return [2 /*return*/, anwsers.update];
        }
    });
}); };
exports.aksForUpdate = aksForUpdate;
//# sourceMappingURL=questions.js.map