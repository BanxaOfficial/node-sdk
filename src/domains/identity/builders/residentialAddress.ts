import {
    ResidentialAddressValidationException,
    ResidentialAddressValidationMessage
} from "../../../exceptions/identity.error";
import {keyConstants} from "../../../library/keyConstants";

export class ResidentialAddress {
    private readonly _country: string;
    private readonly _addressLine?: string;
    private readonly _suburb?: string;
    private readonly _postCode?: string;
    private readonly _state?: string;

    constructor(country: string, addressLine?: string, suburb?: string, postCode?: string, state?: string) {
        this._country = country;
        this._addressLine = addressLine;
        this._suburb = suburb;
        this._postCode = postCode;
        this._state = state;

        this.validateInput();
    }

    private validateInput(): void {
        if (this.country.length > 2) {
            throw new ResidentialAddressValidationException(ResidentialAddressValidationMessage.EXCEPTION);
        }
    }

    public static create(country: string, addressLine?: string, suburb?: string, postCode?: string, state?: string) {
        return new ResidentialAddress(country, addressLine, suburb, postCode, state);
    }

    public toArray(): object {
        return {
            [keyConstants._ADDRESS_LINE_1] : this.addressLine,
            [keyConstants._SUBURB] : this.suburb,
            [keyConstants._POSTAL_CODE] : this.postCode,
            [keyConstants._STATE] : this.state,
            [keyConstants._COUNTRY] : this.country,
        }
    }


    private get country(): string {
        return this._country;
    }

    private get addressLine(): string | undefined {
        return this._addressLine;
    }

    private get suburb(): string | undefined {
        return this._suburb;
    }

    private get postCode(): string | undefined {
        return this._postCode;
    }

    private get state(): string | undefined {
        return this._state;
    }
}