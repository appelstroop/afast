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
exports.exampleResponseJson = exports.checkReleases = void 0;
var cookieJar_1 = require("../cookieJar");
var simple_git_1 = __importDefault(require("simple-git"));
var compare_versions_1 = __importDefault(require("compare-versions"));
function checkReleases(version, fetch, gitClient) {
    return __awaiter(this, void 0, void 0, function () {
        var result, resp, isNewer, options, git, result_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://api.github.com/repos/appelstroop/afast/releases')];
                case 1:
                    resp = _a.sent();
                    if (!resp.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, resp.json()];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    result = exports.exampleResponseJson;
                    _a.label = 4;
                case 4:
                    isNewer = compare_versions_1.default(result[0].tag_name, version);
                    if (isNewer < 1)
                        return [2 /*return*/];
                    options = {
                        baseDir: process.cwd(),
                        binary: 'git',
                        maxConcurrentProcesses: 6,
                    };
                    git = gitClient(options);
                    if (!result) return [3 /*break*/, 8];
                    console.log('pulling...');
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, git.pull()];
                case 6:
                    result_1 = _a.sent();
                    console.log('git result', result_1);
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.checkReleases = checkReleases;
var checkReleasesFactory = function (version) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, checkReleases(version, cookieJar_1.gFetch, simple_git_1.default)];
}); }); };
exports.default = checkReleasesFactory;
exports.exampleResponseJson = [
    {
        url: 'https://api.github.com/repos/appelstroop/afast/releases/42470648',
        assets_url: 'https://api.github.com/repos/appelstroop/afast/releases/42470648/assets',
        upload_url: 'https://uploads.github.com/repos/appelstroop/afast/releases/42470648/assets{?name,label}',
        html_url: 'https://github.com/appelstroop/afast/releases/tag/0.5',
        id: 42470648,
        author: {
            login: 'appelstroop',
            id: 8784949,
            node_id: 'MDQ6VXNlcjg3ODQ5NDk=',
            avatar_url: 'https://avatars.githubusercontent.com/u/8784949?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/appelstroop',
            html_url: 'https://github.com/appelstroop',
            followers_url: 'https://api.github.com/users/appelstroop/followers',
            following_url: 'https://api.github.com/users/appelstroop/following{/other_user}',
            gists_url: 'https://api.github.com/users/appelstroop/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/appelstroop/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/appelstroop/subscriptions',
            organizations_url: 'https://api.github.com/users/appelstroop/orgs',
            repos_url: 'https://api.github.com/users/appelstroop/repos',
            events_url: 'https://api.github.com/users/appelstroop/events{/privacy}',
            received_events_url: 'https://api.github.com/users/appelstroop/received_events',
            type: 'User',
            site_admin: false,
        },
        node_id: 'MDc6UmVsZWFzZTQyNDcwNjQ4',
        tag_name: '0.7',
        target_commitish: 'main',
        name: 'Version 0.5',
        draft: false,
        prerelease: false,
        created_at: '2021-05-05T11:48:59Z',
        published_at: '2021-05-05T11:50:08Z',
        assets: [],
        tarball_url: 'https://api.github.com/repos/appelstroop/afast/tarball/0.5',
        zipball_url: 'https://api.github.com/repos/appelstroop/afast/zipball/0.5',
        body: '',
    },
];
//# sourceMappingURL=checkReleases.js.map