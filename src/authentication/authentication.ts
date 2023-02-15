import crypto from "crypto";

export class Authentication {
    private readonly key: string;
    private readonly secret: string;

    constructor(key: string, secret: string) {
        this.key = key;
        this.secret = secret;
    }

    public generateAuthToken(method: string, uri: string, data: { [key: string]: string} | null, nonce: number) {
        const json = Authentication.getJsonPayload(data);
        const payload = Authentication.buildAuthPayload(method, uri, nonce, json);
        return this.getBearerToken(payload, nonce);
    }

    private static getJsonPayload(data: { [key: string]: string; } | null) {
        return data ? JSON.stringify(data) : null;
    }

    private static buildAuthPayload(method: string, uri: string, nonce: number, json: string | null) {
        return json == null
            ? method + "\n" +  uri + "\n" +  nonce
            : method + "\n" +  uri + "\n" +  nonce + "\n" + json;
    }

    private getBearerToken(payload: string, nonce: number) {
        return `${this.key}:${this.generateHmacSignature(payload)}:${nonce}`;
    }

    private generateHmacSignature(
        payload: string,
    ): string {
        return crypto.createHmac("SHA256", this.secret).update(payload).digest("hex");
    }
}