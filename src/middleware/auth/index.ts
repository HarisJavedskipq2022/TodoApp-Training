import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

class authMiddleware {
    authorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            const token: string | any = req.header("Authorization");

            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            req.body.user = decode;

            next();

        } catch (e) {
            res.status(401).send({ msg: "invalid token" });
        }
    };
}

export default new authMiddleware();
