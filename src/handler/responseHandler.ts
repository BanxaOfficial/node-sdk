import {AxiosResponse} from "axios";
import {HttpException} from "../exceptions/httpException";
import {ServerExceptionError, ServerExceptionMessage} from "../exceptions/serverException.error";
import {UnknownExceptionError, UnknownExceptionMessage} from "../exceptions/unknownException.error";

export class ResponseHandler {
    public IGNORE_DEFLATE = ['spot_price'];

    public async handle(response: AxiosResponse) {
        if (![200, 201, 202].includes(response.status)) {
            this.handleErrors(response);
        }

        const body = response.data;
        const contentType = response.headers['content-type'];

        if (this.contentTypeCannotBeDecoded(contentType)) {
            throw new Error(`Content-Type: ${contentType} could not be converted to a json object`);
        }

        return this.deflate(body);
    }

    private deflate(data: any, i: number = 0) {
        const key = Object.keys(data)[0];
        if (!this.isNumber(key) && !this.IGNORE_DEFLATE.includes(key)) {
            data = data[key];
            while (i < 1) {
                i++;
                data = this.deflate(data, i);
            }
        }
        if (Array.isArray(data)) {
            return data;
        }
        return [data];
    }

    private isNumber(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    protected contentTypeCannotBeDecoded(contentType: string): boolean {
        return !contentType.startsWith('application/json') && !contentType.startsWith('application/octet-stream')
    }

    protected handleErrors(response: AxiosResponse) {
        const statusCode = response.status;
        switch (statusCode) {
            case 400:
                HttpException.badRequest(response);
                break;
            case 401:
                HttpException.unauthorized(response);
                break;
            case 403:
                HttpException.forbidden();
                break;
            case 422:
                HttpException.validationError(response);
                break;
            case 429:
                HttpException.tooManyRequests();
                break;
            case 500:
                throw new ServerExceptionError(ServerExceptionMessage.EXCEPTION);
            default:
                throw new UnknownExceptionError(UnknownExceptionMessage.EXCEPTION);
        }
    }
}