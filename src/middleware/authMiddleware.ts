import {Request, Response, NextFunction} from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({message: 'Unauthorized: No token provided'});
  }

  if (token !== process.env.STATIC_TOKEN) {
    return res.status(401).json({message: 'Unauthorized: Invalid token'});
  }

  return next();
};

export default authMiddleware;
