import {ResponseHandler} from "../../../src/handler/responseHandler";
import {assert} from "chai";
import {AxiosResponse} from "axios";

describe('Http Exception Test', function () {
    const responseHandler = new ResponseHandler();
    const mockedResponse: AxiosResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {'content-type' : 'application/json'},
        config: {},
    }

    it('can return expected exception', async function () {
        mockedResponse.data = {
            data: {
                result: [
                    {"a": "b"}
                ]
            }
        };

        const result = await responseHandler.handle(mockedResponse);
        assert.equal(result.length, 1);
        assert.equal(Object.keys(result[0])[0], 'a');
    });

    it('can deflate one level', async function () {
        mockedResponse.data = {
            result: [
                {"a": "b"}
            ]
        };

        const result = await responseHandler.handle(mockedResponse);
        assert.equal(result.length, 1);
        assert.equal(Object.keys(result[0])[0], 'a');
    });

    it('can avoid deflate', async function () {
        mockedResponse.data = [
            {"a": "b"}
        ];

        const result = await responseHandler.handle(mockedResponse);
        assert.equal(result.length, 1);
        assert.equal(Object.keys(result[0])[0], 'a');
    });

    it('can avoid deflate spot_price', async function () {
        mockedResponse.data = {
            data: {
                spot_price: '69',
                prices: [
                    {"a": "b"}
                ]
            }
        };

        const result = await responseHandler.handle(mockedResponse);
        assert.equal(result.length, 1);
        assert.equal(Object.keys(result[0])[0], 'spot_price');
    });
});
