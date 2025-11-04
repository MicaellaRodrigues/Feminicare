import { Connection, createConnection } from 'typeorm';
import { User } from '../models/User';
import { Professional } from '../models/Professional';
import { Article } from '../models/Article';
import { Content } from '../models/Content';
import { Administrator } from '../models/Administrator';

class DatabaseConnection {
  private connection: Connection | null = null;

  async initialize(): Promise<void> {
    try {
      this.connection = await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'feminicare',
        entities: [User, Professional, Article, Content, Administrator],
        synchronize: true, // Should be false in production
        logging: process.env.NODE_ENV === 'development',
      });
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }

  getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Database connection not initialized');
    }
    return this.connection;
  }
}

export const dbConnection = new DatabaseConnection();