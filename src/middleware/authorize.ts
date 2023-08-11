import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'

export const authorize = (requiredRoles: string[])=>{
    return (req:Request, res:Response,next:NextFunction)=>{
        const token = req.header('Authorization')?.replace('Bearer','');

        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }

        try{
            const decodedToken:any = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            const userRoles:string[] = decodedToken.roles;
            const hasRequiredRoles = requiredRoles.some((role)=>
            userRoles.includes(role));
            if(!hasRequiredRoles){
                return res.status(403).json({message:"Forbidden"});
            }
            req.user = decodedToken;
            next();
         }catch(error){
            return res.status(401).json({message:"Unauthorized"})
         }
    }
}