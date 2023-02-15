import HttpClient from "../client/httpClient";
import {ResponseHandler} from "../handler/responseHandler";

export abstract class Domain {
    private responseHandler: ResponseHandler;
    private readonly client: any;

    protected constructor(client: HttpClient) {
        this.client = client;
        this.responseHandler = new ResponseHandler();
    }

    public getClient() {
        return this.client;
    }

    public async get() {
        return this.responseHandler.handle(await this.getClient().request(
            'GET',
            this.getPath(),
        ))
    }

    protected getPath() {}

    protected buildPayload(param: any) {}

    public async create(param: any) {
        return this.responseHandler.handle(await this.getClient().request(
            'POST',
            this.getPath(),
            this.buildPayload(
                param
            )
        ))
    }
}