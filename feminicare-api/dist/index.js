"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = require("./routes/userRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const professionalRoutes_1 = require("./routes/professionalRoutes");
const articleRoutes_1 = require("./routes/articleRoutes");
const contentRoutes_1 = require("./routes/contentRoutes");
const searchRoutes_1 = require("./routes/searchRoutes");
const errorHandler_1 = require("./middleware/errorHandler");
const database_1 = require("./config/database");
// Load environment variables
dotenv_1.default.config();
// Initialize database connection
database_1.dbConnection.initialize();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', authRoutes_1.authRoutes);
app.use('/api/users', userRoutes_1.userRoutes);
app.use('/api/professionals', professionalRoutes_1.professionalRoutes);
app.use('/api/articles', articleRoutes_1.articleRoutes);
app.use('/api/content', contentRoutes_1.contentRoutes);
app.use('/api/search', searchRoutes_1.searchRoutes);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
