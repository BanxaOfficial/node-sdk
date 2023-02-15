import {OrderTransaction} from "./orderTransaction";

export class SellOrderTransaction extends OrderTransaction {

    constructor(accountReference: string,
                fiatCode: string,
                coinCode: string,
                fiatAmount?: string | number,
                coinAmount?: string | number,
                walletAddress?: string,
                refundAddress?: string,
                paymentMethodId?: string | number,
                blockchain?: string,
                walletAddressTag?: string,
    ) {
        super(accountReference, fiatCode, coinCode, fiatAmount, coinAmount, walletAddress, refundAddress, paymentMethodId, blockchain, walletAddressTag);
    }

    public static createFromFiatAmount(
        accountReference: string,
        fiatCode: string,
        coinCode: string,
        fiatAmount: string | number,
        refundAddress: string,
        paymentMethodId?: string | number,
        blockchain?: string,
        walletAddressTag?: string,
    ) {
        return new SellOrderTransaction(
            accountReference,
            coinCode,
            fiatCode,
            undefined,
            fiatAmount,
            undefined,
            refundAddress,
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
        refundAddress: string,
        paymentMethodId?: string | number,
        blockchain?: string,
        walletAddressTag?: string,
    ) {
        return new SellOrderTransaction(
            accountReference,
            coinCode,
            fiatCode,
            coinAmount,
            undefined,
            undefined,
            refundAddress,
            paymentMethodId,
            blockchain,
            walletAddressTag
        );
    }
}
