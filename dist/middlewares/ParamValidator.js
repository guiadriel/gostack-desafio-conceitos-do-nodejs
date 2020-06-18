"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
function validateUuid(request, response, next) {
    var id = request.params.id;
    if (!uuidv4_1.isUuid(id)) {
        return response.status(400).json({
            message: 'Invalid ID.'
        });
    }
    return next();
}
exports.default = validateUuid;
