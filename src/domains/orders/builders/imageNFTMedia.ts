import {keyConstants} from "../../../library/keyConstants";
import {NftMedia} from "./nftMedia";

export class ImageNFTMedia extends NftMedia{

    constructor(type: string, link: string) {
        super(type, link);
    }

    public static create(link: string) {
        return new ImageNFTMedia(keyConstants._NFT_TYPE_IMAGE, link);
    }
}