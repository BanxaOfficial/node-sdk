import {assert} from "chai";
import {NftData} from "../../../../src/domains/orders/builders/nftData";
import {Nft} from "../../../../src/domains/orders/builders/nft";
import {ImageNFTMedia} from "../../../../src/domains/orders/builders/imageNFTMedia";
import {VideoNftMedia} from "../../../../src/domains/orders/builders/videoNftMedia";

describe('NFT media test', function () {
    it('can create a video nft media object', function () {
        const nftMetaData = NftData.create(
            'Special Reference',
            Nft.create(
                'Test_name',
                'collection',
                ImageNFTMedia.create('testinglink.com.au')
            )
        );
        assert.instanceOf(nftMetaData, NftData)
    });

    it('can create an object with image nft media and get array', function () {
        const nftMetaData = NftData.create(
            'Special Reference',
            Nft.create(
                'Test_name',
                'collection',
                ImageNFTMedia.create('testinglink.com.au')
            )
        );
        assert.isObject(nftMetaData.toArray())
    });

    it('can create an object with video nft media', function () {
        const nftMetaData = NftData.create(
            'Special Reference',
            Nft.create(
                'Test_name',
                'collection',
                VideoNftMedia.create('testinglink.com.au')
            )
        );
        assert.isObject(nftMetaData)
    });

    it('can create an object with video nft media and get array', function () {
        const nftMetaData = NftData.create(
            'Special Reference',
            Nft.create(
                'Test_name',
                'collection',
                VideoNftMedia.create('testinglink.com.au')
            )
        );
        assert.isObject(nftMetaData.toArray())
    });
});