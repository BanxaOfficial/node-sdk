import Banxa from "../../src";

import {assert} from "chai";
import nock from "nock";
import {CountriesResponse} from "../fixtures/countries/countriesResponse";
import {UsStatesResponse} from "../fixtures/countries/usStatesResponse";
import {CryptoCurrencyResponse} from "../fixtures/currencies/cryptoCurrencyResponse";
import {FiatResponse} from "../fixtures/currencies/fiatResponse";
import {PaymentMethodsResponse} from "../fixtures/paymentMethods/paymentMethodsResponse";
import {PricesResponse} from "../fixtures/prices/pricesResponse";
import {CustomerIdentity} from "../../src/domains/identity/builders/customerIdentity";
import {IdentityDocumentCollection} from "../../src/domains/identity/builders/identityDocumentCollection";
import {IdentitySharingCollection} from "../../src/domains/identity/builders/identitySharingCollection";
import {CustomerDetail} from "../../src/domains/identity/builders/customerDetail";
import {ResidentialAddress} from "../../src/domains/identity/builders/residentialAddress";
import {IdentitySharingProvider} from "../../src/domains/identity/builders/identitySharingProvider";
import {DOCUMENT_TYPES, IdentityDocument} from "../../src/domains/identity/builders/identityDocument";
import {CreateIdentityResponse} from "../fixtures/identity/createIdentityResponse";
import {orderStatus} from "../../src/library/orderStatus";
import {BuyOrderTransaction} from "../../src/domains/orders/builders/buyOrderTransaction";
import {OrderResponse} from "../fixtures/orders/orderResponse";
import {SellOrderTransaction} from "../../src/domains/orders/builders/sellOrderTransaction";
import {NftBuyOrderTransaction} from "../../src/domains/orders/builders/nftBuyOrderTransaction";
import {NftData} from "../../src/domains/orders/builders/nftData";
import {Nft} from "../../src/domains/orders/builders/nft";
import {VideoNftMedia} from "../../src/domains/orders/builders/videoNftMedia";

describe('banxa test', function () {
    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    })

    it('can getCountries', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/countries')
            .reply(200, CountriesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getCountries();
        assert.equal(Array.isArray(resp), true);
    });

    it('can getUsStates', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/countries/us/states')
            .reply(200, UsStatesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getUsStates();
        assert.equal(Array.isArray(resp), true);
    });

    it('can getBuyCryptoCurrencies', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/coins/sell')
            .reply(200, CryptoCurrencyResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getBuyCryptoCurrencies();
        assert.equal(Array.isArray(resp), true);
    });

    it('can getSellCryptoCurrencies', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/coins/buy')
            .reply(200, CryptoCurrencyResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getSellCryptoCurrencies();
        assert.equal(Array.isArray(resp), true);
    });

    it('can getBuyFiatCurrencies', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/fiats/buy')
            .reply(200, FiatResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getBuyFiatCurrencies();
        assert.equal(Array.isArray(resp), true);
    });

    it('can getSellFiatCurrencies', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/fiats/sell')
            .reply(200, FiatResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getSellFiatCurrencies();
        assert.equal(Array.isArray(resp), true);
    });

    it('can getAllPaymentMethods', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/payment-methods')
            .reply(200, FiatResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getAllPaymentMethods();
        assert.equal(Array.isArray(resp), true);
    });

    it('can getBuyPaymentMethods', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/payment-methods?source=AUD&target=BTC')
            .reply(200, PaymentMethodsResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getBuyPaymentMethods('AUD', 'BTC');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getSellPaymentMethods', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/payment-methods?source=BTC&target=AUD')
            .reply(200, PaymentMethodsResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getSellPaymentMethods('AUD', 'BTC');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getAllBuyPrices', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=AUD&target=BTC&source_amount=100.25&blockchain=BTC')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getAllBuyPrices('AUD', 'BTC', '100.25', 'BTC');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getAllBuyPrices from coin amount', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=AUD&target=BTC&target_amount=1.0123&blockchain=BTC')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getAllBuyPricesFromCoinAmount('AUD', 'BTC', '1.0123', 'BTC');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getBuyPrices', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=AUD&target=BTC&source_amount=100.25&payment_method_id=101&blockchain=BTC')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getBuyPrices('AUD', 'BTC', '100.25', 101, 'BTC');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getBuyPrices from coin amount', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=AUD&target=BTC&target_amount=1.0123&payment_method_id=101&blockchain=BTC')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getBuyPricesFromCoinAmount('AUD', 'BTC', '1.0123', 101, 'BTC');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getAllSellPrices', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=BTC&target=AUD&source_amount=100.25')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getAllSellPrices('BTC', 'AUD', '100.25');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getAllSellPrices from fiat amount', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=BTC&target=AUD&target_amount=300.5')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getAllSellPricesFromFiatAmount('BTC', 'AUD', '300.5');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getSellPrices', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=BTC&target=AUD&source_amount=100.25&payment_method_id=2102')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getSellPrices('BTC', 'AUD', '100.25', '2102');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getSellPrices from fiat amount', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/prices?source=BTC&target=AUD&target_amount=300.5&payment_method_id=2102')
            .reply(200, PricesResponse.get())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getSellPricesFromFiatAmount('BTC', 'AUD', '300.5', '2102');
        assert.equal(Array.isArray(resp), true);
    });

    it('can createIdentity', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post('/api/identities', {
                "account_reference":"test00100122",
                "mobile_number":"61431000022",
                "email":"test@bitcoin.com",
                "customer_identity":{
                    "given_name":"FooBarBaz",
                    "surname":"FizBuz",
                    "dob":"2001-01-01",
                    "residential_address":{
                        "country":"FO",
                        "address_line_1":"21 FooBarBaz FizBuz",
                        "suburb":"Foobaz",
                        "post_code":"3000 VIC",
                        "state":"BAZ",
                    }
                },
                "identity_sharing":[{
                    "provider":"sumsub",
                    "token":"bar",
                }],
                "identity_documents":[{
                        "type":"PASSPORT",
                        "images":[{
                            "link":"https://www.orimi.com/pdf-test.pdf"
                        }],
                        "data":{
                            "number":"BTCBaz007"
                        }
                }]
            })
            .reply(200, CreateIdentityResponse.success())

        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true).createIdentity(
            IdentitySharingCollection.create([
                IdentitySharingProvider.create('sumsub', 'bar')
            ]),
            CustomerDetail.create('test00100122', '61431000022', 'test@bitcoin.com'),
            CustomerIdentity.create('FooBarBaz', 'FizBuz', '2001-01-01'),
            IdentityDocumentCollection.create([
                IdentityDocument.create(
                    DOCUMENT_TYPES.DOCUMENT_TYPE_PASSPORT,
                    ['https://www.orimi.com/pdf-test.pdf'],
                    'BTCBaz007'
                )
            ]),
            ResidentialAddress.create('FO', '21 FooBarBaz FizBuz', 'Foobaz', '3000 VIC', 'BAZ')
        );
        assert.equal(Array.isArray(resp), true);
    });

    it('can createIdentity with required parameters', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post('/api/identities', {
                "account_reference":"test00100122",
                "mobile_number":"61431000022",
                "email":"test@bitcoin.com",
                "customer_identity":{
                    "given_name":"FooBarBaz",
                    "surname":"FizBuz",
                    "dob":"2001-01-01",
                },
                "identity_sharing":[{
                    "provider":"sumsub",
                    "token":"bar"
                }],
            })
            .reply(200, CreateIdentityResponse.success())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true).createIdentity(
            IdentitySharingCollection.create([
                IdentitySharingProvider.create('sumsub', 'bar')
            ]),
            CustomerDetail.create('test00100122', '61431000022', 'test@bitcoin.com'),
            CustomerIdentity.create('FooBarBaz', 'FizBuz', '2001-01-01'),
        );
        assert.equal(Array.isArray(resp), true);
    });

    it('can getOrder', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/orders/84cecea94e3b8c08386623e46503aebc')
            .reply(200, OrderResponse.getOrder())
        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getOrder('84cecea94e3b8c08386623e46503aebc');
        assert.equal(Array.isArray(resp), true);
    });

    it('can getOrders', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .get('/api/orders?start_date=2012-01-01&end_date=2012-02-01&status=expired&per_page=100&page=1&account_reference=reference-121')
            .reply(200, OrderResponse.getOrders())

        const resp = await Banxa.create('SUBDOMAIN', 'API', 'SECRET', true)
            .getOrders(
                '2012-01-01',
                '2012-02-01',
                [orderStatus.EXPIRED],
                100,
                1,
                'reference-121'
            );
        assert.equal(Array.isArray(resp), true);
    });


    it('can createBuyOrder', async function () {
        const orderTransaction = BuyOrderTransaction.createFromFiatAmount(
            'test001asdhjsaklda025412',
            "AUD",
            "BTC",
            100,
            "1LbQ1WNTsm1Nzj1hbh3WDCbEim1oUg5rfi",
            6007,
            undefined,
            undefined
        )
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post(
                '/api/orders',
                {
                    'account_reference': 'test001asdhjsaklda025412',
                    'source': 'AUD',
                    'target': 'BTC',
                    'source_amount': '100',
                    'wallet_address': '1LbQ1WNTsm1Nzj1hbh3WDCbEim1oUg5rfi',
                    'payment_method_id': '6007',
                    'options': {'readonly_amounts': true},
                    'return_url_on_success': 'https://hello.world',
                    'return_url_on_cancelled': 'https://hello.world',
                    'return_url_on_failure': 'https://hello.world',
                    'meta_data': 'metadatastring',
                    'iframe_domain': 'https://test',
                })
            .reply(200, OrderResponse.createOrder());

        const resp = await Banxa.create('subdomain', 'API', 'SECRET', true)
            .createBuyOrder(
                orderTransaction,
                true,
                'https://hello.world',
                'https://hello.world',
                'https://hello.world',
                'metadatastring',
                'https://test'
            );
        assert.equal(Array.isArray(resp), true);
    });

    it('can createDynamicBuyOrder', async function () {
        const orderTransaction = BuyOrderTransaction.createDynamic(
            'test001asdhjsaklda025412',
            "AUD",
            "BTC",
            100,
            undefined,
            "1LbQ1WNTsm1Nzj1hbh3WDCbEim1oUg5rfi",
            undefined,
            undefined,
            undefined,
            undefined
        )
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post(
                '/api/orders',
                {
                    'account_reference': 'test001asdhjsaklda025412',
                    'source': 'AUD',
                    'target': 'BTC',
                    'source_amount': '100',
                    'wallet_address': '1LbQ1WNTsm1Nzj1hbh3WDCbEim1oUg5rfi',
                    'options': {'readonly_amounts': true},
                    'return_url_on_success': 'https://hello.world',
                    'return_url_on_cancelled': 'https://hello.world',
                    'return_url_on_failure': 'https://hello.world',
                    'meta_data': 'metadatastring',
                    'iframe_domain': 'https://test',
                })
            .reply(200, OrderResponse.createOrder());

        const resp = await Banxa.create('subdomain', 'API', 'SECRET', true)
            .createBuyOrder(
                orderTransaction,
                true,
                'https://hello.world',
                'https://hello.world',
                'https://hello.world',
                'metadatastring',
                'https://test'
            );
        assert.equal(Array.isArray(resp), true);
    });

    it('can createSellOrder', async function () {
        const orderTransaction = SellOrderTransaction.createFromFiatAmount(
            'Banxa-test-01',
            "AUD",
            "BTC",
            100,
            "1LbQ1WNTsm1Nzj1hbh3WDCbEim1oUg5rfi",
            6007,
            undefined,
            undefined
        )
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post(
                '/api/orders',
                {
                    'account_reference': 'Banxa-test-01',
                    'source': 'BTC',
                    'target': 'AUD',
                    'target_amount': '100',
                    'refund_address': '1LbQ1WNTsm1Nzj1hbh3WDCbEim1oUg5rfi',
                    'payment_method_id': '6007',
                    'options': {'readonly_amounts': true},
                    'return_url_on_success': 'https://hello.world',
                    'return_url_on_cancelled': 'https://hello.world',
                    'return_url_on_failure': 'https://hello.world',
                    'meta_data': 'metadatastring',
                    'iframe_domain': 'https://test',
                })
            .reply(200, OrderResponse.createOrder());


        const resp = await Banxa.create('subdomain', 'API', 'SECRET', true)
            .createSellOrder(
                orderTransaction,
                true,
                'https://hello.world',
                'https://hello.world',
                'https://hello.world',
                'metadatastring',
                'https://test'
            );
        assert.equal(Array.isArray(resp), true);
    });

    it('can createDynamicSellOrder', async function () {
        const orderTransaction = SellOrderTransaction.createDynamic(
            'Banxa-test-01',
            "BTC",
            "AUD",
            0.001,
            undefined,
            undefined,
            "xxxxxxxxxxxxxxxxxxx",
            undefined,
            undefined,
            undefined
        )
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post(
                '/api/orders',
                {
                    'account_reference': 'Banxa-test-01',
                    'source': 'BTC',
                    'target': 'AUD',
                    'source_amount': '0.001',
                    'refund_address': 'xxxxxxxxxxxxxxxxxxx',
                    'options': {'readonly_amounts': true},
                    'return_url_on_success': 'https://hello.world',
                    'return_url_on_cancelled': 'https://hello.world',
                    'return_url_on_failure': 'https://hello.world',
                    'meta_data': 'metadatastring',
                    'iframe_domain': 'https://test',
                })
            .reply(200, OrderResponse.createOrder());


        const resp = await Banxa.create('subdomain', 'API', 'SECRET', true)
            .createSellOrder(
                orderTransaction,
                true,
                'https://hello.world',
                'https://hello.world',
                'https://hello.world',
                'metadatastring',
                'https://test'
            );
        assert.equal(Array.isArray(resp), true);
    });



    it('can createNFTBuyOrder', async function () {
        const orderTransaction = NftBuyOrderTransaction.create(
            "test-13467",
            "AUD",
            "ETH",
            110,
            "0xd2c54D4E5bBDcB17B445063746b9826126e95d62"
        )
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post(
                '/api/orders/nft/buy',
                {
                    "return_url_on_success":"https://hello.world",
                    "return_url_on_cancelled":"https://hello.world",
                    "return_url_on_failure":"https://hello.world",
                    "source":"AUD",
                    "target":"ETH",
                    "source_amount":"110",
                    "wallet_address":"0xd2c54D4E5bBDcB17B445063746b9826126e95d62",
                    "account_reference":"test-13467",
                    "meta_data":{
                        "purchase_reference":"Special Reference",
                        "nft":{
                            "name":"Test_name",
                            "collection":"Collection",
                            "media":{
                                "type":"video",
                                "link":"testinglink.com.au",
                            }
                        },
                        "reference":"ref-1234567"
                    },
                    "iframe_domain":"https://hello.world"}
            )
            .reply(200, OrderResponse.createOrder());

        const nftData = NftData.create(
            'Special Reference',
            Nft.create(
                'Test_name',
                'Collection',
                VideoNftMedia.create('testinglink.com.au')
            ),
            {reference: 'ref-1234567'}
        );
        const resp = await Banxa.create('subdomain', 'API', 'SECRET', true)
            .createNftBuyOrder(
                orderTransaction,
                nftData,
                'https://hello.world',
                'https://hello.world',
                'https://hello.world',
                'https://hello.world',
            );
        assert.equal(Array.isArray(resp), true);
    });

    it('can confirmSellOrder', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post(
                '/api/orders/84cecea94e3b8c08386623e46503aebc/confirm',
                {
                    "tx_hash":"xxxxxx",
                    "source_address":"xxxxxx",
                    "destination_address":"xxxxxxxx",
                    "source_address_tag":"xxxxxxx",
                    "destination_address_tag":"xxxxxx"
                })
            .reply(200, OrderResponse.createOrder());

        const resp = await Banxa.create('subdomain', 'API', 'SECRET', true)
            .confirmSellOrder(
                '84cecea94e3b8c08386623e46503aebc',
                'xxxxxx',
                'xxxxxx',
                'xxxxxxxx',
                'xxxxxxx',
                'xxxxxx',
            );
        assert.equal(Array.isArray(resp), true);
    });


    it('can confirmSellOrder with only required parameters', async function () {
        nock('https://subdomain.banxa-sandbox.com', {"encodedQueryParams": true})
            .post(
                '/api/orders/84cecea94e3b8c08386623e46503aebc/confirm',
                {
                    "tx_hash":"xxxxxx",
                    "source_address":"xxxxxx",
                    "destination_address":"xxxxxxxx"
                })
            .reply(200, OrderResponse.createOrder());

        const resp = await Banxa.create('subdomain', 'API', 'SECRET', true)
            .confirmSellOrder(
                '84cecea94e3b8c08386623e46503aebc',
                'xxxxxx',
                'xxxxxx',
                'xxxxxxxx',
            );
        assert.equal(Array.isArray(resp), true);
    });
});