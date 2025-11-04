"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Professional_1 = require("../models/Professional");
const Article_1 = require("../models/Article");
const Content_1 = require("../models/Content");
const Administrator_1 = require("../models/Administrator");
class DatabaseConnection {
    constructor() {
        this.connection = null;
    }
    async initialize() {
        try {
            this.connection = await (0, typeorm_1.createConnection)({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: Number(process.env.DB_PORT) || 3306,
                username: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'feminicare',
                entities: [User_1.User, Professional_1.Professional, Article_1.Article, Content_1.Content, Administrator_1.Administrator],
                synchronize: true, // Should be false in production
                logging: process.env.NODE_ENV === 'development',
            });
            console.log('Database connection established successfully');
        }
        catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }
    getConnection() {
        if (!this.connection) {
            throw new Error('Database connection not initialized');
        }
        return this.connection;
    }
}
exports.dbConnection = new DatabaseConnection();
