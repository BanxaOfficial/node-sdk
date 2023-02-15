export class CustomerDetail {

    private readonly _accountReference: string;
    private readonly _mobileNumber: string;
    private readonly _emailAddress: string;

    constructor(accountReference: string, mobileNumber: string, emailAddress: string) {
        this._accountReference = accountReference;
        this._mobileNumber = mobileNumber;
        this._emailAddress = emailAddress;
    }

    public static create(accountReference: string, mobileNumber: string, emailAddress: string) {
        return new CustomerDetail(accountReference, mobileNumber, emailAddress);
    }

    public get accountReference(): string {
        return this._accountReference;
    }

    public get mobileNumber(): string {
        return this._mobileNumber;
    }

    public get emailAddress(): string {
        return this._emailAddress;
    }
}