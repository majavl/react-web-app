import {AuthenticatedRequest, TokenPayload} from "../types/types";
import jwt from "jsonwebtoken";
import {NextFunction, Response} from "express";

export const SECRET_KEY = '5jM1V81Xjn8SY3ryPiUi';

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as TokenPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const tokenVerified = verifyToken(token);

    req.email = tokenVerified as TokenPayload;
    next();
};