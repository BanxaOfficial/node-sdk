import {Domain} from "../domain";
import {OrderTransaction} from "./builders/orderTransaction";
import {NftData} from "./builders/nftData";
import {keyConstants} from "../../library/keyConstants";
import HttpClient from "../../client/httpClient";

export interface NftOrder {
    orderTransaction: OrderTransaction,
    nftData: NftData,
    returnUrlOnSuccess: string,
    returnUrlOnFailure?: string,
    returnUrlOnCancelled?: string,
    iframeRefererDomain?: string
}

export class CreateNftOrder extends Domain {
    private path: string = 'api/orders/nft/buy';

    constructor(client: HttpClient) {
        super(client);
    }

    protected buildPayload(nftOrder: NftOrder): object {
        let payload: {[key: string]: string | undefined} = {
            [keyConstants._RETURN_URL_TYPE_ON_SUCCESS] : nftOrder.returnUrlOnSuccess,
            [keyConstants._RETURN_URL_TYPE_ON_FAILURE] : nftOrder.returnUrlOnFailure,
            [keyConstants._RETURN_URL_TYPE_ON_CANCELLED] : nftOrder.returnUrlOnCancelled,
            ...nftOrder.orderTransaction.toArray(),
            ...nftOrder.nftData.toArray(),
        }
        for (const key in payload) {
            if (payload[key] === undefined) {
                delete payload[key];
            }
        }

        if (nftOrder.iframeRefererDomain?.length) {
            payload[keyConstants._IFRAME_REFERER_DOMAIN] = nftOrder.iframeRefererDomain;
        }

        return payload;
    }

    protected getPath(): string {
        return this.path;
    }
}