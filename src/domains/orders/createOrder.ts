import {Domain} from "../domain";
import {keyConstants} from "../../library/keyConstants";
import HttpClient from "../../client/httpClient";
import {BuyOrderTransaction} from "./builders/buyOrderTransaction";
import {SellOrderTransaction} from "./builders/sellOrderTransaction";
import {NftBuyOrderTransaction} from "./builders/nftBuyOrderTransaction";

export interface Order {
    orderTransaction: BuyOrderTransaction | SellOrderTransaction | NftBuyOrderTransaction,
    readOnlyAmounts: boolean,
    returnUrlOnSuccess: string,
    returnUrlOnFailure?: string,
    returnUrlOnCancelled?: string,
    metaData?: string,
    iframeRefererDomain?: string,
}
export class CreateOrder extends Domain {
    private path: string = 'api/orders';

    constructor(client: HttpClient) {
        super(client);
    }

    protected buildPayload(order: Order): object {
        let payload: {[key: string]: string | object | undefined} = {
            [keyConstants._RETURN_URL_TYPE_ON_SUCCESS] : order.returnUrlOnSuccess,
            [keyConstants._RETURN_URL_TYPE_ON_FAILURE] : order.returnUrlOnFailure,
            [keyConstants._RETURN_URL_TYPE_ON_CANCELLED] : order.returnUrlOnCancelled,
            ...order.orderTransaction.toArray(),
        }
        for (const key in payload) {
            if (payload[key] === undefined) {
                delete payload[key];
            }
        }

        if (order.readOnlyAmounts) {
            payload[keyConstants._OPTIONS] = {
                [keyConstants._READONLY_AMOUNTS] : order.readOnlyAmounts
            };
        }

        if (order.metaData?.length) {
            payload[keyConstants._META_DATA] = order.metaData;
        }

        if (order.iframeRefererDomain?.length) {
            payload[keyConstants._IFRAME_REFERER_DOMAIN] = order.iframeRefererDomain;
        }

        return payload;
    }

    protected getPath(): string {
        return this.path;
    }
}