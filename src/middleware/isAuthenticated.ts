import { Request,Response,NextFunction } from "express";
import jwt,{JwtPayload} from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY:string | undefined = process.env.ACCESS_TOKEN_SECRET;

export const validateToken = (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    if(!token){
        return res.status(401).json({message:'Access Denied,Token missing'})
    }
    try{
    const _decoded = jwt.verify(token, SECRET_KEY!) as { user: JwtPayload };
    req.user = _decoded.user;
    console.log("decoded",_decoded);
    next();
}catch(error){
        console.log("error is",error); 
        res.status(401).json({message:'Access Denied, Invalid token'})
    }
}



  // console.log("in try block")
        // console.log("secret key",SECRET_KEY!);
 // const [header, payload, signature] = token.split('.');
  //     jwt.verify(token, SECRET_KEY!, (_err, _decoded) => {
    //         if(_err){
    //             res.status(401);
    //             throw new Error("User is not Authorized")
    //         }
    //         console.log("decoded token",_decoded);
    //                 req.user = _decoded.user;
    //                 next();
    // }) as unknown as JwtPayload;

     // }catch(error){
    //     console.log("error is",error); 
    //     res.status(401).json({message:'Access Denied, Invalid token'})
    // }
    // let token;
    // let authHeader = req.headers.Authorization || req.headers.authorization;
    // if(authHeader && authHeader.startswith("Bearer")){
    //     token = authHeader.split(" ")[1];
    //     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
    //         if(err){
    //             res.status(401);
    //             throw new Error("User is not authorized");
    //         }
    //         // console.log("original url inside jwt",req.originalUrl);
    //         console.log("decoded token",decoded);
    //         req.user = decoded.user;
    //         next();
    //     });

    //     if(!token){
    //         res.status(401);
    //         throw new Error("User is not authorized or token is missing");
    //     }
    // }