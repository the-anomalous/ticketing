import { ValidationError } from "express-validator";
import CustomError from "@/errors/custom-abs.error";

class RequestValidationError extends CustomError {
    statusCode = 400

    constructor(public err:ValidationError[]) {
        super("Request Validation error") 
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.err.map(data => {
            if (data.type === 'field') {
                return {
                    message: data.msg,
                    field: data.path 
                }
            }
            return {message:data.msg}
        })
    }
}

export default RequestValidationError