export class ServerExceptionError extends Error {
    code = 500;
    constructor(message: string) {
        super(message);
    }
}

export enum ServerExceptionMessage {
    EXCEPTION = 'A server error occurred.'
}