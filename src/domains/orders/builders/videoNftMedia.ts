import {keyConstants} from "../../../library/keyConstants";
import {NftMedia} from "./nftMedia";

export class VideoNftMedia extends NftMedia{
    constructor(type: string, link: string) {
        super(type, link);
    }

    public static create(link: string) {
        return new VideoNftMedia(keyConstants._NFT_TYPE_VIDEO, link);
    }
}