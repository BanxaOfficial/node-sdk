import {assert} from "chai";
import {NftBuyOrderTransaction} from "../../../../src/domains/orders/builders/nftBuyOrderTransaction";

describe('NFT buy order transaction test', function () {
    it('can create a nft buy order transaction', function () {
        const nftBuyOrderTransaction = NftBuyOrderTransaction.create(
            'Testing',
            'AUD',
            'LUNA',
            100,
            'test',
        )

        assert.instanceOf(nftBuyOrderTransaction, NftBuyOrderTransaction)
        assert.equal(nftBuyOrderTransaction.accountReference, 'Testing');
        assert.equal(nftBuyOrderTransaction.source, 'AUD');
        assert.equal(nftBuyOrderTransaction.target, 'LUNA');
        assert.equal(nftBuyOrderTransaction.sourceAmount, 100);
        assert.equal(nftBuyOrderTransaction.walletAddress, 'test');
    });
});