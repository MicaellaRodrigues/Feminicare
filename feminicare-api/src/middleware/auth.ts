import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';

interface JwtPayload {
  id: string;
  role: string;
}

// Interface para nosso request com o usuário
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    let token;
    
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      throw new ApiError(401, 'Not authorized, no token');
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    
    // Atribuir ao request como tipo AuthenticatedRequest
    authReq.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    next(new ApiError(401, 'Not authorized'));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;
    
    if (!authReq.user || !roles.includes(authReq.user.role)) {
      return next(new ApiError(403, 'Not authorized to access this route'));
    }
    next();
  };
};
