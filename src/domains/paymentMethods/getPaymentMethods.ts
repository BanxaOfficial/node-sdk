import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";
import {keyConstants} from "../../library/keyConstants";

export class GetPaymentMethods extends Domain {
    private _source?: string;
    private _target?: string;
    private path = 'api/payment-methods';

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
        const payload: {[key: string]: string | undefined} = {
            [keyConstants._SOURCE] : this.source,
            [keyConstants._TARGET] : this.target,
        }
        for (const key in payload) {
            if (payload[key] === undefined) {
                delete payload[key];
            }
        }
        return payload;
    }

    protected getPath(): string {
        return this.buildPath();
    }

    private get source(): string | undefined {
        return this._source;
    }

    public setSource(source?: string) {
        this._source = source;
        return this;
    }

    private get target(): string | undefined {
        return this._target;
    }

    public setTarget(target?: string) {
        this._target = target;
        return this;
    }
}