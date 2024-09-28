import NotAuthorizedError from "@/errors/not-authorized.middleware";
import { NextFunction, Request, Response } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {

  if (!req.session?.jwt) throw new NotAuthorizedError();

  next();
};

export default requireAuth;
