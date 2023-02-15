import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";

export interface SellOrderConfirm {
    txHash: string,
    sourceAddress: string,
    destinationAddress: string,
    sourceAddressTag?: string,
    destinationAddressTag?: string,
}

export class ConfirmSellOrder extends Domain {
    private path: string = 'api/orders/{order_id}/confirm';
    private _orderId: string = '';

    public setOrderId(orderId: string) {
        this._orderId = orderId;
        return this;
    }

    constructor(client: HttpClient) {
        super(client);
    }

    protected buildPayload(order: SellOrderConfirm) {
       let payload: {[key: string]: string} = {
           'tx_hash' : order.txHash,
           'source_address' : order.sourceAddress,
           'destination_address' : order.destinationAddress,
       }

       if (order.sourceAddressTag?.length) {
           payload["source_address_tag"] = order.sourceAddressTag;
       }

       if (order.destinationAddressTag?.length) {
           payload["destination_address_tag"] = order.destinationAddressTag;
       }

        return payload;
    }

    protected getPath(): string {
        return this.buildPath();
    }

    private buildPath(): string {
        return this.path.replace('{order_id}', this.orderId);
    }

    get orderId(): string {
        return this._orderId;
    }
}