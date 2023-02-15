import { RequestBuilder } from "./requestBuilder";
import {Authentication} from "../authentication/authentication";
import axios from "axios";

export enum HttpMethod {
    GET= "GET",
    POST = "POST"
}

export default class HttpClient {

    private baseUrl: string = 'https://{subdomain}.banxa.com/';
    private sandboxUrl: string = 'https://{subdomain}.banxa-sandbox.com/';
    private requestBuilder: RequestBuilder;

    constructor(subdomain: string, key: string, secret: string, testMode: boolean) {
        this.requestBuilder = new RequestBuilder(new Authentication(key, secret));
        this.baseUrl = this.getUrl(subdomain, testMode);
    }

    public getRequestBuilder() {
        return this.requestBuilder;
    }

    private async get(uri: string, query: { [key: string]: string; } | null) {
        return await axios.get(this.baseUrl + uri, {
            params: query,
            headers: this.getRequestBuilder().getHeaders(),
        })
    }

    private async post(uri: string, query: { [key: string]: string; } | null) {
        return await axios.post(this.baseUrl + uri, query,{
            headers: this.getRequestBuilder().getHeaders(),
        });
    }

    private request(method: HttpMethod, uri: string, payload: { [key: string]: string; } | null) {
        if (method == HttpMethod.GET) {
            return this.authorizeRequest(method, uri, payload).get(uri, payload);
        }
        if (method == HttpMethod.POST) {
            return this.authorizeRequest(method, uri, payload).post(uri, payload);
        }
    }

    private authorizeRequest(method: HttpMethod, uri: string, payload: { [key: string]: string; } | null) {
        this.requestBuilder.generateAuthenticationHeader(method, uri, payload);
        return this;
    }

    private getUrl(subdomain: string, isTestMode: boolean): string {
        const targetDomain = isTestMode ? this.sandboxUrl : this.baseUrl;
        return targetDomain.replace('{subdomain}', subdomain);
    }
}