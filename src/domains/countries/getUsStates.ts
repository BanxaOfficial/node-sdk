import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";

export class GetUsStates extends Domain {
    private path: string = 'api/countries/us/states';

    constructor(client: HttpClient) {
        super(client);
    }

    protected getPath(): string {
        return this.path;
    }
}