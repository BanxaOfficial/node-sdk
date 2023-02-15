import { Authentication } from "../authentication/authentication";

export class RequestBuilder {

    private authenticationHeader: { [key: string]: string; } | undefined;
    private authentication: Authentication;

    private headers: {[key: string]: string} = {
        'Content-Type':     "application/json",
        'Accept-Encoding':  "gzip, deflate, br",
        'Accept':           "\"*/*",
        'x-banxa-sdk':      'x-ref-sdk-2021',
        'Cookie':           'XDEBUG_SESSION=PHPSTORM',
    }

    constructor(authentication: Authentication) {
        this.authentication = authentication;
    }

    public generateAuthenticationHeader(method: string, uri: string, payload: { [key: string]: string; } | null) {
        this.authenticationHeader = {
            "Authorization" : "Bearer " + this.authentication.generateAuthToken(
                method,
                uri,
                payload,
                Date.now(),
            )
        }
    }

    public getHeaders() {
        if (!this.authenticationHeader) {
            throw new Error('Authentication Required');
        }
        return {...this.headers, ...this.authenticationHeader};
    }
}