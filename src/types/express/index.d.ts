import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      // user?: Record<string,any>
      user?: JwtPayload

    }
  }
}