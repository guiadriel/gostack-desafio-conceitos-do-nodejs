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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var CreateRepository_1 = __importDefault(require("./services/CreateRepository"));
var ParamValidator_1 = __importDefault(require("./middlewares/ParamValidator"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(["/repositories/:id", "/repositories/:id/like"], ParamValidator_1.default);
var repositories = [];
app.get("/repositories", function (request, response) {
    return response.json(repositories);
});
app.post("/repositories", function (request, response) {
    var _a = request.body, title = _a.title, url = _a.url, techs = _a.techs;
    var repository = CreateRepository_1.default({
        title: title,
        url: url,
        techs: techs,
        likes: 0
    });
    repositories.push(repository);
    return response.json(repository);
});
app.put("/repositories/:id", function (request, response) {
    var id = request.params.id;
    var _a = request.body, title = _a.title, url = _a.url, techs = _a.techs;
    var repositoryIndex = repositories.findIndex(function (repository) { return repository.id === id; });
    if (repositoryIndex < 0) {
        return response.status(400).json({
            error: 'Repository not found.'
        });
    }
    repositories[repositoryIndex] = __assign(__assign({}, repositories[repositoryIndex]), { title: title, url: url, techs: techs });
    return response.json(repositories[repositoryIndex]);
});
app.delete("/repositories/:id", function (request, response) {
    var id = request.params.id;
    var repositoryIndex = repositories.findIndex(function (repository) { return repository.id === id; });
    if (repositoryIndex < 0) {
        return response.status(400).json({
            error: 'Repository not found...'
        });
    }
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
});
app.post("/repositories/:id/like", function (request, response) {
    var id = request.params.id;
    var repositoryIndex = repositories.findIndex(function (repository) { return repository.id === id; });
    if (repositoryIndex < 0) {
        return response.status(400).json({
            error: 'Repository not found.'
        });
    }
    var likes = ++repositories[repositoryIndex].likes;
    repositories[repositoryIndex] = __assign(__assign({}, repositories[repositoryIndex]), { likes: likes });
    console.log(likes);
    return response.json(repositories[repositoryIndex]);
});
module.exports = app;
