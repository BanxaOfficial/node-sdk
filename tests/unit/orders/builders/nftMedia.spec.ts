import {assert} from "chai";
import {VideoNftMedia} from "../../../../src/domains/orders/builders/videoNftMedia";
import {ImageNFTMedia} from "../../../../src/domains/orders/builders/imageNFTMedia";

describe('NFT media test', function () {
    it('can create a video nft media object', function () {
        const videoNftMedia = VideoNftMedia.create('testing-link.com.au');
        assert.instanceOf(videoNftMedia, VideoNftMedia)
    });

    it('can create a video nft media object', function () {
        const imageNFTMedia = ImageNFTMedia.create('testing-link.com.au');
        assert.instanceOf(imageNFTMedia, ImageNFTMedia)
    });
});