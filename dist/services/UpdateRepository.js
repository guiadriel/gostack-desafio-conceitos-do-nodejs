"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
function updateRepository(_a) {
    var id = _a.id, title = _a.title, url = _a.url, techs = _a.techs;
    if (!uuidv4_1.isUuid(id))
        return false;
    var repository = {
        title: title,
        url: url,
        techs: techs,
    };
    return repository;
}
exports.default = updateRepository;
