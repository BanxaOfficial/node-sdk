export class UnknownExceptionError extends Error {
    code = 500;
    constructor(message: string) {
        super(message);
    }
}

export enum UnknownExceptionMessage {
    EXCEPTION = 'An unexpected exception occurred.'
}