"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const protect = async (req, res, next) => {
    try {
        const authReq = req;
        let token;
        // Check for token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new ApiError_1.ApiError(401, 'Not authorized, no token');
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // Atribuir ao request como tipo AuthenticatedRequest
        authReq.user = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (error) {
        next(new ApiError_1.ApiError(401, 'Not authorized'));
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        const authReq = req;
        if (!authReq.user || !roles.includes(authReq.user.role)) {
            return next(new ApiError_1.ApiError(403, 'Not authorized to access this route'));
        }
        next();
    };
};
exports.authorize = authorize;
