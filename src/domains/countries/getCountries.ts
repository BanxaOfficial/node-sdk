import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";

export class GetCountries extends Domain {
    private path: string = 'api/countries';

    constructor(client: HttpClient) {
        super(client);
    }

    protected getPath(): string {
       return this.path;
    }
}