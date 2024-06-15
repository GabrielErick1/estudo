"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = void 0;
function handleErrorResponse(res, error) {
    res.status(error.statusCode).json({ error: error.message });
}
exports.handleErrorResponse = handleErrorResponse;
