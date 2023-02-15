import {keyConstants} from "../../../library/keyConstants";

export class OrderTransaction {
    private readonly _accountReference: string;
    private readonly _source: string;
    private readonly _target: string;
    private readonly _sourceAmount?: string | number;
    private readonly _targetAmount?: string | number;
    private readonly _walletAddress?: string;
    private readonly _refundAddress?: string;
    private readonly _paymentMethodId?: string | number;
    private readonly _blockchain?: string;
    private readonly _walletAddressTag?: string;

    constructor(accountReference: string, source: string, target: string, sourceAmount?: string | number, targetAmount?: string | number, walletAddress?: string, refundAddress?: string, paymentMethodId?: string | number, blockchain?: string, walletAddressTag?: string) {
        this._accountReference = accountReference;
        this._source = source;
        this._target = target;
        this._sourceAmount = sourceAmount;
        this._targetAmount = targetAmount;
        this._walletAddress = walletAddress;
        this._refundAddress = refundAddress;
        this._paymentMethodId = paymentMethodId;
        this._blockchain = blockchain;
        this._walletAddressTag = walletAddressTag;
    }

    public static createDynamic(
        accountReference: string,
        source: string,
        target: string,
        sourceAmount?: string | number,
        targetAmount?: string | number,
        walletAddress?: string,
        refundAddress?: string,
        paymentMethodId?: string | number,
        blockchain?: string,
        walletAddressTag?: string,
    ) {
        return new OrderTransaction(
            accountReference,
            source,
            target,
            sourceAmount,
            targetAmount,
            walletAddress,
            refundAddress,
            paymentMethodId,
            blockchain,
            walletAddressTag);
    }

    public toArray(): object {
        const params = {
            [keyConstants._SOURCE] : this.source,
            [keyConstants._TARGET] : this.target,
            [keyConstants._SOURCE_AMOUNT] : this.sourceAmount,
            [keyConstants._TARGET_AMOUNT] : this.targetAmount,
            [keyConstants._WALLET_ADDRESS] : this.walletAddress,
            [keyConstants._REFUND_ADDRESS] : this.refundAddress,
            [keyConstants._ACCOUNT_REFERENCE] : this.accountReference,
            [keyConstants._PAYMENT_METHOD_ID] : this.paymentMethodId,
            [keyConstants._BLOCKCHAIN] : this.blockchain,
            [keyConstants._WALLET_ADDRESS_TAG] : this.walletAddressTag,
        }
        for (const key in params) {
            if (params[key] === undefined) {
                delete params[key];
            }
        }
        return params;
    }

    public get accountReference(): string {
        return this._accountReference;
    }

    public get source(): string {
        return this._source;
    }

    public get target(): string {
        return this._target;
    }

    public get sourceAmount(): string | number | undefined {
        return this._sourceAmount?.toString();
    }

    public get targetAmount(): string | number | undefined {
        return this._targetAmount?.toString();
    }

    public get walletAddress(): string | undefined {
        return this._walletAddress;
    }

    public get refundAddress(): string | undefined {
        return this._refundAddress;
    }

    public get paymentMethodId(): string | number | undefined {
        return this._paymentMethodId?.toString();
    }

    public get blockchain(): string | undefined {
        return this._blockchain;
    }

    public get walletAddressTag(): string | undefined {
        return this._walletAddressTag;
    }

}