import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";
import {keyConstants} from "../../library/keyConstants";

export class GetPrices extends Domain {
    private _source: string = '';
    private _target: string = '';
    private _source_amount?: string | number;
    private _payment_method_id? : string | number;
    private _blockchain?: string;
    private path = 'api/prices';

    constructor(client: HttpClient) {
        super(client);
    }

    private buildPath(): string {
        return (this.source && this.target)
            // @ts-ignore
            ? this.path + '?' + new URLSearchParams(this.buildParameters()).toString()
            : this.path;
    }

    private buildParameters(): object {
        const params = {
            [keyConstants._SOURCE] : this.source,
            [keyConstants._TARGET] : this.target,
            [keyConstants._SOURCE_AMOUNT] : this.sourceAmount,
            [keyConstants._PAYMENT_METHOD_ID] : this.paymentMethodId,
            [keyConstants._BLOCKCHAIN] : this.blockchain,
        }
        for (const key in params) {
            if (params[key] === undefined) {
                delete params[key];
            }
        }
        return params;
    }

    protected getPath(): string {
        return this.buildPath();
    }

    private get source(): string {
        return this._source;
    }

    public setSource(source: string) {
        this._source = source.toUpperCase();
        return this;
    }

    private get target(): string {
        return this._target;
    }

    public setTarget(target: string) {
        this._target = target.toUpperCase();
        return this;
    }

    private get sourceAmount(): string | undefined {
        return this._source_amount?.toString();
    }

    public setSourceAmount(source_amount: string | number) {
        this._source_amount = source_amount?.toString();
        return this;
    }

    private get paymentMethodId(): string | undefined {
        return this._payment_method_id?.toString();
    }

    public setPaymentMethodId(payment_method_id?: string | number) {
        this._payment_method_id = payment_method_id?.toString();
        return this;
    }

    private get blockchain(): string | undefined {
        return this._blockchain;
    }

    public setBlockchain(blockchain?: string) {
        this._blockchain = blockchain;
        return this;
    }
}