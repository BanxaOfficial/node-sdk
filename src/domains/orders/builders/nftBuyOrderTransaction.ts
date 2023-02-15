import {OrderTransaction} from "./orderTransaction";

export class NftBuyOrderTransaction extends OrderTransaction{

    constructor(accountReference: string,
                fiatCode: string,
                coinCode: string,
                fiatAmount: string | number,
                walletAddress: string,
                paymentMethodId?: string | number,
                blockchain?: string,
                walletAddressTag?: string,
    ) {
        super(accountReference, fiatCode, coinCode, fiatAmount, undefined, walletAddress, undefined, paymentMethodId, blockchain, walletAddressTag);
    }

    public static create(
        accountReference: string,
        fiatCode: string,
        coinCode: string,
        fiatAmount: string | number,
        walletAddress: string,
        paymentMethodId?: string | number,
        blockchain?: string,
        walletAddressTag?: string,
    ) {
        return new NftBuyOrderTransaction(
            accountReference,
            fiatCode,
            coinCode,
            fiatAmount,
            walletAddress,
            paymentMethodId,
            blockchain,
            walletAddressTag
        );
    }
}