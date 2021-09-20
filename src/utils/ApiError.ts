export default class ApiError extends Error {
    public code: number
    public isOperational: Boolean;
    public stack?: string;

    constructor(code: number, message: string, isOperational = true, stack = '') {
        super(message);
        this.code = code;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    };
}