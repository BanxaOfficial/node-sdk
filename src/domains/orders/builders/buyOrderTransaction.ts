import {OrderTransaction} from "./orderTransaction";

export class BuyOrderTransaction extends OrderTransaction {

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

    public static createFromFiatAmount(
        accountReference: string,
        fiatCode: string,
        coinCode: string,
        fiatAmount: string | number,
        walletAddress: string,
        paymentMethodId?: string | number,
        blockchain?: string,
        walletAddressTag?: string,
    ) {
        return new BuyOrderTransaction(
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

    public static createFromCoinAmount(
        accountReference: string,
        fiatCode: string,
        coinCode: string,
        coinAmount: string | number,
        walletAddress: string,
        paymentMethodId?: string | number,
        blockchain?: string,
        walletAddressTag?: string,
    ) {
        return new BuyOrderTransaction(
            accountReference,
            fiatCode,
            coinCode,
            coinAmount,
            walletAddress,
            paymentMethodId,
            blockchain,
            walletAddressTag
        );
    }
}
