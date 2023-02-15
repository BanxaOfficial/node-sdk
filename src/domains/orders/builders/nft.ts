import {keyConstants} from "../../../library/keyConstants";
import {NftMedia} from "./nftMedia";

export class Nft {
    private readonly _name: string;
    private readonly _collection: string;
    private readonly _nftMedia!: NftMedia;

    constructor(name: string, collection: string, nftMedia: NftMedia) {
        this._name = name;
        this._collection = collection;
        this._nftMedia = nftMedia;
    }

    public static create(name: string, collection: string, nftMedia: NftMedia) {
        return new Nft(name, collection, nftMedia);
    }

    public toArray(): object {
        return {
            [keyConstants._NFT_NAME] : this.name,
            [keyConstants._NFT_COLLECTION] : this.collection,
            [keyConstants._NFT_MEDIA] : this.nftMedia.toArray(),
        }
    }

    private get name(): string {
        return this._name;
    }

    private get collection(): string {
        return this._collection;
    }

    private get nftMedia(): NftMedia {
        return this._nftMedia;
    }
}