import {ResponseHandler} from "../../../../src/handler/responseHandler";
import {AxiosResponse} from "axios";
import {assert} from "chai";
import {HttpException} from "../../../../src/exceptions/httpException";
import {ServerExceptionMessage} from "../../../../src/exceptions/serverException.error";
import {UnknownExceptionMessage} from "../../../../src/exceptions/unknownException.error";

describe('Http Exception Test', function () {
    const responseHandler = new ResponseHandler();
    const mockedResponse: AxiosResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {'content-type' : 'application/json'},
        config: {},
    }

    it('can return expected 400 exception', async function () {
        mockedResponse.status = 400;
        mockedResponse.data = {"errors": {"status": 400,"code": 3220,"title": "Could not find source"}};

        try {
            await responseHandler.handle(mockedResponse);
        } catch (e: any) {
            assert.equal(e.message, 'Could not find source (Code: 3220)');
        }
    });

    it('can return expected 401 exception', async function () {
        mockedResponse.status = 401;
        mockedResponse.data = {"errors":{"status":401,"code":40103,"title":"You are not authorized to access this resource."}};

        try {
            await responseHandler.handle(mockedResponse);
        } catch (e: any) {
            assert.equal(e.message, 'You are not authorized to access this resource. (Code: 40103)');
        }
    });

    it('can return expected 403 exception', async function () {
        mockedResponse.status = 403;

        try {
            await responseHandler.handle(mockedResponse);
        } catch (e: any) {
            assert.equal(e.message, HttpException.FORBIDDEN_EXCEPTION_MESSAGE);
        }
    });

    it('can return expected 422 exception', async function () {
        mockedResponse.status = 422;
        mockedResponse.data = {"errors":{"status":422,"code":422,"title":"The given data was invalid.","detail":{"start_date":"The start date field is required.","end_date":"The end date field is required."}}};

        try {
            await responseHandler.handle(mockedResponse);
        } catch (e: any) {
            assert.equal(e.message, HttpException.VALIDATION_EXCEPTION_MESSAGE + ': The start date field is required., The end date field is required.');
        }
    });

    it('can return expected 429 exception', async function () {
        mockedResponse.status = 429;

        try {
            await responseHandler.handle(mockedResponse);
        } catch (e: any) {
            assert.equal(e.message, HttpException.TOO_MANY_REQUESTS_EXCEPTION_MESSAGE);
        }
    });

    it('can return expected 500 exception', async function () {
        mockedResponse.status = 500;

        try {
            await responseHandler.handle(mockedResponse);
        } catch (e: any) {
            assert.equal(e.message, ServerExceptionMessage.EXCEPTION);
        }
    });

    it('can return expected 501 exception', async function () {
        mockedResponse.status = 501;

        try {
            await responseHandler.handle(mockedResponse);
        } catch (e: any) {
            assert.equal(e.message, UnknownExceptionMessage.EXCEPTION);
        }
    });
});