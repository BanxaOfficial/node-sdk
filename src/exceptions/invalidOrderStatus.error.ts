export class InvalidOrderStatusError extends Error {
    code = 422;
    constructor(message: string) {
        super(message);
    }
}

export enum InvalidOrderStatusMessage {
    EXCEPTION = 'Invalid order status provided'
}