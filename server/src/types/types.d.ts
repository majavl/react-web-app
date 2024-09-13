// src/types.d.ts
import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
    email: string;
}

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    email?: TokenPayload;
}
