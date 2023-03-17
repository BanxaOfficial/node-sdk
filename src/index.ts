import HttpClient from "./client/httpClient";
import {GetCountries} from "./domains/countries/getCountries";
import {GetUsStates} from "./domains/countries/getUsStates";
import {GetCryptoCurrencies} from "./domains/currencies/getCryptoCurrencies";
import {GetFiats} from "./domains/currencies/getFiats";
import {GetPaymentMethods} from "./domains/paymentMethods/getPaymentMethods";
import {GetPrices} from "./domains/prices/getPrices";
import {IdentitySharingCollection} from "./domains/identity/builders/identitySharingCollection";
import {CustomerDetail} from "./domains/identity/builders/customerDetail";
import {CustomerIdentity} from "./domains/identity/builders/customerIdentity";
import {IdentityDocumentCollection} from "./domains/identity/builders/identityDocumentCollection";
import {ResidentialAddress} from "./domains/identity/builders/residentialAddress";
import {CreateIdentity} from "./domains/identity/createIdentity";
import {GetOrders} from "./domains/orders/getOrders";
import {BuyOrderTransaction} from "./domains/orders/builders/buyOrderTransaction";
import {CreateOrder} from "./domains/orders/createOrder";
import {NftBuyOrderTransaction} from "./domains/orders/builders/nftBuyOrderTransaction";
import {NftData} from "./domains/orders/builders/nftData";
import {CreateNftOrder} from "./domains/orders/createNftOrder";
import {GetOrder} from "./domains/orders/getOrder";
import {SellOrderTransaction} from "./domains/orders/builders/sellOrderTransaction";
import {ConfirmSellOrder} from "./domains/orders/confirmSellOrder";

export default class Banxa {
    private httpClient: HttpClient;

    constructor(subdomain: string, key: string, secret: string, testMode: boolean) {
        this.httpClient = new HttpClient(subdomain, key, secret, testMode);
    }

    public static create(subdomain: string, key: string, secret: string, testMode: boolean) {
        return new Banxa(subdomain, key, secret, testMode);
    }

    public getCountries() {
        return new GetCountries(this.httpClient).get();
    }

    public getUsStates() {
        return new GetUsStates(this.httpClient).get();
    }

    public getBuyCryptoCurrencies() {
        return new GetCryptoCurrencies(this.httpClient).setBuyMode().get();
    }

    public getSellCryptoCurrencies() {
        return new GetCryptoCurrencies(this.httpClient).setSellMode().get();
    }

    public getBuyFiatCurrencies() {
        return new GetFiats(this.httpClient).setBuyMode().get();
    }

    public getSellFiatCurrencies() {
        return new GetFiats(this.httpClient).setSellMode().get();
    }

    public getAllPaymentMethods() {
        return new GetPaymentMethods(this.httpClient)
            .setTarget()
            .setSource()
            .get()
    }

    public getBuyPaymentMethods(fiatCode: string, coinCode: string) {
        return new GetPaymentMethods(this.httpClient)
            .setSource(fiatCode)
            .setTarget(coinCode)
            .get()
    }

    public getSellPaymentMethods(coinCode: string, fiatCode: string) {
        return new GetPaymentMethods(this.httpClient)
            .setTarget(coinCode)
            .setSource(fiatCode)
            .get()
    }

    public getAllBuyPrices(fiatCode: string, coinCode: string, fiatAmount: string | number, blockchain?: string) {
        return new GetPrices(this.httpClient)
            .setSource(fiatCode)
            .setTarget(coinCode)
            .setSourceAmount(fiatAmount)
            .setPaymentMethodId()
            .setBlockchain(blockchain)
            .get()
    }

    public getBuyPrices(fiatCode: string, coinCode: string, fiatAmount: string | number, paymentMethodId: string | number, blockchain?: string) {
        return new GetPrices(this.httpClient)
            .setSource(fiatCode)
            .setTarget(coinCode)
            .setSourceAmount(fiatAmount)
            .setPaymentMethodId(paymentMethodId)
            .setBlockchain(blockchain)
            .get()
    }

    public getAllSellPrices(coinCode: string, fiatCode: string, coinAmount: string | number) {
        return new GetPrices(this.httpClient)
            .setSource(coinCode)
            .setTarget(fiatCode)
            .setSourceAmount(coinAmount)
            .setPaymentMethodId()
            .setBlockchain()
            .get()
    }

    public getSellPrices(coinCode: string, fiatCode: string, coinAmount: string | number, paymentMethodId: string) {
        return new GetPrices(this.httpClient)
            .setSource(coinCode)
            .setTarget(fiatCode)
            .setSourceAmount(coinAmount)
            .setPaymentMethodId(paymentMethodId)
            .setBlockchain()
            .get()
    }

    public createIdentity(
        identitySharingCollection: IdentitySharingCollection,
        customerDetails: CustomerDetail,
        customerIdentity: CustomerIdentity,
        identityDocumentCollection?: IdentityDocumentCollection,
        residentialAddress?: ResidentialAddress
    ) {
        return new CreateIdentity(this.httpClient).create({
            identitySharingCollection,
            customerDetails,
            customerIdentity,
            identityDocumentCollection,
            residentialAddress}
        )
    }

    public getOrder(orderId: string) {
        return new GetOrder(this.httpClient).setOrderId(orderId).get();
    }

    public getOrders(
        startDate: string,
        endDate: string,
        statuses?: string[],
        perPage: string | number = 100,
        page: string | number = 1,
        accountReference?: string
    ) {
        return new GetOrders(this.httpClient)
            .setStartDate(startDate)
            .setEndDate(endDate)
            .setStatuses(statuses)
            .setPerPage(perPage)
            .setPage(page)
            .setAccountReference(accountReference)
            .get();
    }

    public createBuyOrder(
        orderTransaction: BuyOrderTransaction,
        readOnlyAmounts: boolean,
        returnUrlOnSuccess: string,
        returnUrlOnFailure?: string,
        returnUrlOnCancelled?: string,
        metaData?: string,
        iframeRefererDomain?: string,
    ) {
        return new CreateOrder(this.httpClient).create({
            orderTransaction,
            readOnlyAmounts,
            returnUrlOnSuccess,
            returnUrlOnFailure,
            returnUrlOnCancelled,
            metaData,
            iframeRefererDomain
        });
    }

    public createNftBuyOrder(
        orderTransaction: NftBuyOrderTransaction,
        nftData: NftData,
        returnUrlOnSuccess: string,
        returnUrlOnFailure?: string,
        returnUrlOnCancelled?: string,
        iframeRefererDomain?: string,
    ) {
        return new CreateNftOrder(this.httpClient).create({
            orderTransaction,
            nftData,
            returnUrlOnSuccess,
            returnUrlOnFailure,
            returnUrlOnCancelled,
            iframeRefererDomain,
        });
    }

    public createSellOrder(
        orderTransaction: SellOrderTransaction,
        readOnlyAmounts: boolean,
        returnUrlOnSuccess: string,
        returnUrlOnFailure?: string,
        returnUrlOnCancelled?: string,
        metaData?: string,
        iframeRefererDomain?: string,
    ) {
        return new CreateOrder(this.httpClient).create({
            orderTransaction,
            readOnlyAmounts,
            returnUrlOnSuccess,
            returnUrlOnFailure,
            returnUrlOnCancelled,
            metaData,
            iframeRefererDomain
        });
    }

    public confirmSellOrder(
        orderId: string,
        txHash: string,
        sourceAddress: string,
        destinationAddress: string,
        sourceAddressTag?: string,
        destinationAddressTag?: string
    ) {
        return new ConfirmSellOrder(this.httpClient)
            .setOrderId(orderId)
            .create({
                txHash,
                sourceAddress,
                destinationAddress,
                sourceAddressTag,
                destinationAddressTag
            })
    }
}