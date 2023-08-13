import { Request, Response, NextFunction } from "express";


export const checkAuth = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles = req.user?.roles || [];
        const hasRequiredRole = requiredRoles.some((role) =>
            userRoles.includes(role)
        );
        if (hasRequiredRole) {
            next();
        } else {
            res.status(403).json({ message: "Unauthorized" })
        }
    }
}