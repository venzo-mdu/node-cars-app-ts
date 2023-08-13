import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY: string | undefined = process.env.ACCESS_TOKEN_SECRET;

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("inside token validatiom");
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Access Denied,Token missing' })
    }
    try {
        const _decoded = jwt.verify(token, SECRET_KEY!) as { user: JwtPayload };
        req.user = _decoded.user;
        console.log("decoded", _decoded);
        next();
    } catch (error) {
        console.log("error is", error);
        res.status(401).json({ message: 'Access Denied, Invalid token' })
    }
}
