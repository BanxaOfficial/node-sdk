import {BuyOrderTransaction} from "../../../../src/domains/orders/builders/buyOrderTransaction";
import { assert } from 'chai';

describe('buy order transaction test', function () {
    it('can create a buy order transaction from fiat amount', function () {
        const buyOrderTransaction = BuyOrderTransaction.createFromFiatAmount(
            'Testing',
            'AUD',
            'LUNA',
            100,
            'TEST',
            6003
        )

        assert.instanceOf(buyOrderTransaction, BuyOrderTransaction)
        assert.equal(buyOrderTransaction.accountReference, 'Testing');
        assert.equal(buyOrderTransaction.source, 'AUD');
        assert.equal(buyOrderTransaction.target, 'LUNA');
        assert.equal(buyOrderTransaction.sourceAmount, 100);
        assert.equal(buyOrderTransaction.walletAddress, 'TEST');
        assert.equal(buyOrderTransaction.paymentMethodId, 6003);
    });
});
