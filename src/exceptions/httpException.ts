import {AxiosResponse} from "axios";

export class HttpException extends Error {
    public static VALIDATION_EXCEPTION_MESSAGE = 'Validation exception';
    public static FORBIDDEN_EXCEPTION_MESSAGE = 'Forbidden.';
    public static TOO_MANY_REQUESTS_EXCEPTION_MESSAGE = 'Too many requests.';

    constructor(message: string) {
        super(message);
    }

    public static badRequest(response: AxiosResponse) {
        throw new HttpException(this.getErrorTitle(response));
    }

    public static unauthorized(response: AxiosResponse) {
        throw new HttpException(this.getErrorTitle(response));
    }

    public static forbidden() {
        throw new HttpException(this.FORBIDDEN_EXCEPTION_MESSAGE);
    }

    public static validationError(response: AxiosResponse) {
        throw new HttpException(this.VALIDATION_EXCEPTION_MESSAGE + ': ' + this.parseAsStringMessage(response));
    }

    public static tooManyRequests() {
        throw new HttpException(this.TOO_MANY_REQUESTS_EXCEPTION_MESSAGE);
    }

    private static parseAsStringMessage(response: AxiosResponse) {
        const content = response.data;
        return Object.keys(content).includes('errors') && Object.keys(content.errors).includes('detail')
            ? Object.values(content.errors.detail).join(', ')
            : content;
    }

    protected static getErrorTitle(response: AxiosResponse) {
        const content = response.data;
        return Object.keys(content).includes('errors')
            ? content.errors.title +  ' (Code: ' + content.errors.code + ')'
            : content;
    }
}