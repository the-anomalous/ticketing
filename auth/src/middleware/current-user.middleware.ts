import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface currentUserInterface {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: currentUserInterface;
    }
  }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) next();

  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as currentUserInterface;
    req.currentUser = payload;
  } catch (err) {}

  next();
};

export default currentUser;
