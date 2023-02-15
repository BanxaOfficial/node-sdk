import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";

export class GetFiats extends Domain {
    private BUY_MODE: string = 'buy';
    private SELL_MODE: string = 'sell';
    private path: string = 'api/fiats';
    private mode: string = '';

    constructor(client: HttpClient) {
        super(client);
    }

    private buildPath(): string {
        return this.mode ? this.path + "/" + this.mode : this.path;
    }

    protected getPath(): string {
        return this.buildPath();
    }

    public setBuyMode() {
        this.mode = this.BUY_MODE;
        return this;
    }

    public setSellMode() {
        this.mode = this.SELL_MODE;
        return this;
    }
}