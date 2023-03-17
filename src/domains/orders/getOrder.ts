import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";

export class GetOrder extends Domain {

    private path: string = 'api/orders';
    private _orderId: string = '';

    constructor(client: HttpClient) {
        super(client);
    }

    private buildPath(): string {
        return this.path + "/" + this.orderId;
    }

    protected getPath(): string {
        return this.buildPath();
    }

    private get orderId(): string {
        return this._orderId;
    }

    public setOrderId(orderId: string): GetOrder {
        this._orderId = orderId;
        return this;
    }
}