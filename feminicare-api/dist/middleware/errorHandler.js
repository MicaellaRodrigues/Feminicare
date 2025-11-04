"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log error for developers
    console.error(err);
    // TypeORM unique constraint error
    if (err.name === 'QueryFailedError' && err.code === 'ER_DUP_ENTRY') {
        error = new ApiError_1.ApiError(409, 'Duplicate entry');
    }
    // Return error response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};
exports.errorHandler = errorHandler;
