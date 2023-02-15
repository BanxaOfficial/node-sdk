import {Authentication} from "../../../src/authentication/authentication";
import assert from 'assert';

describe('Authentication Test', function () {
    let uri: string;
    let key: string;
    let secret: string;

    beforeEach(async () => {
        uri = "foo/bar";
        key = "accessKey";
        secret = "accessKeySecret";
    });

    it('can generate an auth token', function () {
        const method = "GET";
        const expected = "61a1f11dfff3a200be6e02fa3a1b2e16f4928b8d7d1b061b4815a2fdfed1f67c";
        const authentication = new Authentication(key, secret);
        const tokens = authentication.generateAuthToken(method, uri, {}, -1).split(":");

        assert.equal(tokens.length, 3);
        assert.equal(tokens[0], key);
        assert.equal(tokens[1], expected);
        assert.equal(typeof tokens[2], 'string');
    });

    it('can generate an auth token with data', function () {
        const method = "POST";
        const data = {'test': 'data'};
        const expected = "dc0327c28375f930d145cd2545e1fc68f40d008ffbdd80d4f807d4c20d3ef6d3";
        const authentication = new Authentication(key, secret);
        const tokens = authentication.generateAuthToken(method, uri, data, -1).split(":");

        assert.equal(tokens.length, 3);
        assert.equal(tokens[0], key);
        assert.equal(tokens[1], expected);
        assert.equal(typeof tokens[2], 'string');
    });
});
