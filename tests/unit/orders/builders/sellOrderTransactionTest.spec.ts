import {assert} from "chai";
import {SellOrderTransaction} from "../../../../src/domains/orders/builders/sellOrderTransaction";

describe('Sell Order Trasaction Test', function () {
    it('can create a sell order transaction form fiat amount', function () {
        const sellOrderTransaction = SellOrderTransaction.createFromFiatAmount(
            'Testing',
            'AUD',
            'LUNA',
            100,
            'xxxxxx'
        );

        assert.instanceOf(sellOrderTransaction, SellOrderTransaction);
        assert.equal(sellOrderTransaction.accountReference, 'Testing');
        assert.equal(sellOrderTransaction.target, 'AUD');
        assert.equal(sellOrderTransaction.source, 'LUNA');
        assert.equal(sellOrderTransaction.targetAmount, 100);
        assert.equal(sellOrderTransaction.refundAddress, 'xxxxxx');
    });

    it('can create a sel order transacion from coin amount', function () {
        const sellOrderTransaction = SellOrderTransaction.createFromCoinAmount(
            'Testing',
            'AUD',
            'LUNA',
            100000000000000,
            'xxxxxx'
        );

        assert.instanceOf(sellOrderTransaction, SellOrderTransaction);
        assert.equal(sellOrderTransaction.accountReference, 'Testing');
        assert.equal(sellOrderTransaction.target, 'AUD');
        assert.equal(sellOrderTransaction.source, 'LUNA');
        assert.equal(sellOrderTransaction.sourceAmount, 100000000000000);
        assert.equal(sellOrderTransaction.refundAddress, 'xxxxxx');
    });
});