import {Nft} from "./nft";
import {keyConstants} from "../../../library/keyConstants";

export class NftData {
    private readonly _purchaseReference: string;
    private readonly _nft!: Nft;
    private readonly _metaData?: object;

    constructor(purchaseReference: string, nft: Nft, metaData?: object) {
        this._purchaseReference = purchaseReference;
        this._nft = nft;
        this._metaData = metaData;
    }

    public static create(purchaseReference: string, nft: Nft, metaData?: object) {
        return new NftData(purchaseReference, nft, metaData);
    }

    public toArray(): object {
        return {
            [keyConstants._META_DATA] : {
                [keyConstants._PURCHASE_REFERENCE] : this.purchaseReference,
                [keyConstants._NFT] : this.nft?.toArray(),
                ...this.metaData ?? {}
            }
        }
    }

    private get purchaseReference(): string {
        return this._purchaseReference;
    }

    private get nft(): Nft {
        return this._nft;
    }

    private get metaData(): object | undefined {
        return this._metaData;
    }
}