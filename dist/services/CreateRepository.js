"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
function createRepository(_a) {
    var title = _a.title, url = _a.url, techs = _a.techs, _b = _a.likes, likes = _b === void 0 ? 0 : _b;
    var repository = {
        id: uuidv4_1.uuid(),
        title: title,
        url: url,
        techs: techs,
        likes: likes
    };
    return repository;
}
exports.default = createRepository;
