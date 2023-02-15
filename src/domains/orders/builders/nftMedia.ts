import {keyConstants} from "../../../library/keyConstants";

export abstract class NftMedia {

    private readonly _type: string;
    private readonly _link: string;

    protected constructor(type: string, link: string) {
        this._type = type;
        this._link = link;
    }

    public toArray(): object {
        return {
            [keyConstants._TYPE]: this.type,
            [keyConstants._NFT_LINK]: this.link
        }
    }

    private get type(): string {
        return this._type;
    }

    private get link(): string {
        return this._link;
    }
}