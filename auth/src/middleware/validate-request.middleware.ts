import RequestValidationError from "@/errors/request-validation.error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        throw new RequestValidationError(result.array())
    }

    next()
};

export default validateRequest;
