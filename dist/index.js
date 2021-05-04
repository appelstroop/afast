"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
var authRequests_1 = __importDefault(require("./login/authRequests"));
var confirm2FA_1 = __importDefault(require("./login/confirm2FA"));
var emailRequest_1 = __importDefault(require("./login/emailRequest"));
var passwordRequest_1 = __importDefault(require("./login/passwordRequest"));
var twoFAMethodRequest_1 = __importDefault(require("./login/twoFAMethodRequest"));
var getCookie_1 = __importDefault(require("./login/getCookie"));
var getSecureToken_1 = __importDefault(require("./hours/getSecureToken"));
var getProjects_1 = __importDefault(require("./hours/getProjects"));
var yargs_1 = __importDefault(require("yargs"));
var questions_1 = require("./questions");
var submitHours_1 = __importDefault(require("./hours/submitHours"));
var findProject_1 = __importDefault(require("./hours/findProject"));
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
var loginPipe = asyncPipe(questions_1.askLoginQuestions, authRequests_1.default, emailRequest_1.default, passwordRequest_1.default, twoFAMethodRequest_1.default, questions_1.askForVerificationToken, confirm2FA_1.default);
var hoursPipe = asyncPipe(getCookie_1.default, getSecureToken_1.default, getProjects_1.default, questions_1.askForProjectAndHours, findProject_1.default, questions_1.askForDescription, submitHours_1.default);
var argv = yargs_1.default(process.argv.slice(2))
    .command('login', 'Login to afas (2FA)')
    .alias('E', 'email')
    .alias('P', 'password')
    .alias('p', 'project')
    .alias('h', 'hours')
    .string(['h', 'p', 'E', 'P'])
    .describe('E', 'Email adress')
    .describe('P', 'Password for x3')
    .describe('p', 'the project code')
    .describe('h', 'hours to write today')
    .describe('verbose', 'verbose error logging').argv;
function cli(args) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, project, hours, login, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = argv.email, password = argv.password, project = argv.project, hours = argv.hours;
                    login = argv._[0] === 'login';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!login) return [3 /*break*/, 3];
                    console.log('logging in...');
                    return [4 /*yield*/, loginPipe({ email: email, password: password })];
                case 2:
                    _a.sent();
                    console.log('You are logged in :)');
                    return [3 /*break*/, 5];
                case 3: 
                // await getCookie()
                // const { id, secure } = await getSecureToken()
                // if (!id || !secure) console.log('You are not logged in. Use afast login!')
                return [4 /*yield*/, hoursPipe({ projectCode: project, hours: hours })];
                case 4:
                    // await getCookie()
                    // const { id, secure } = await getSecureToken()
                    // if (!id || !secure) console.log('You are not logged in. Use afast login!')
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    // catch all async errors and just log them
                    argv.verbose ? console.error(err_1) : console.log("Error: " + err_1.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.cli = cli;
//# sourceMappingURL=index.js.map