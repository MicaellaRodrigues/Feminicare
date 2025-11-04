import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log error for developers
  console.error(err);

  // TypeORM unique constraint error
  if (err.name === 'QueryFailedError' && (err as any).code === 'ER_DUP_ENTRY') {
    error = new ApiError(409, 'Duplicate entry');
  }

  // Return error response
  res.status((error as ApiError).statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};