import CustomError from "@/errors/custom-abs.error";

class NotFoundError extends CustomError {
    statusCode = 404;
    
    constructor() {
        super("Error: Page not found")

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{
            message: "Error: Page not found"
        }]
    }
}

export default NotFoundError