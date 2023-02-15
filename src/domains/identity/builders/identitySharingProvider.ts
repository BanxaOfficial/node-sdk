export class IdentitySharingProvider {
    private readonly _provider: string;
    private readonly _token: string;

    constructor(provider: string, token: string) {
        this._provider = provider;
        this._token = token;
    }

    public static create(provider: string, token: string) {
        return new IdentitySharingProvider(provider, token);
    }

    public get provider(): string {
        return this._provider;
    }

    public get token(): string {
        return this._token;
    }
}