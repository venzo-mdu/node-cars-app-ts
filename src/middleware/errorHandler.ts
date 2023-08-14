import {Response,Request,NextFunction} from 'express';

const errorHandler = (
    err: Error,
    res: Response,
    req: Request,
    next:NextFunction
) => {
    console.log(err.stack);
    // if (err.name == 'ValidationError') {
    //     return res.status(400).json({ message: err.message });
    // }
    res.status(500).json({ message: "Something went wrong" });
}

// module.exports = errorHandler
export default errorHandler;