import {assert} from "chai";
import {ImageNFTMedia} from "../../../../src/domains/orders/builders/imageNFTMedia";
import {Nft} from "../../../../src/domains/orders/builders/nft";

describe('NFT Test', function () {
    it('can create an NFT object', function () {
        const nft = Nft.create(
            'Test_name',
            'Collection',
            ImageNFTMedia.create('testing-link.com.au')
        );
        assert.instanceOf(nft, Nft)
    });

    it('can create an NFT object and get array', function () {
        const nft = Nft.create(
            'Test_name',
            'Collection',
            ImageNFTMedia.create('testing-link.com.au')
        );
        assert.isObject(nft.toArray())
    });
});