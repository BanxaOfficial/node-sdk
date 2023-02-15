import {IdentitySharingCollection} from "./builders/identitySharingCollection";
import {CustomerDetail} from "./builders/customerDetail";
import {CustomerIdentity} from "./builders/customerIdentity";
import {IdentityDocumentCollection} from "./builders/identityDocumentCollection";
import {ResidentialAddress} from "./builders/residentialAddress";
import {keyConstants} from "../../library/keyConstants";
import {Domain} from "../domain";
import HttpClient from "../../client/httpClient";

export interface Identity {
    identitySharingCollection: IdentitySharingCollection,
    customerDetails: CustomerDetail,
    customerIdentity: CustomerIdentity,
    identityDocumentCollection?: IdentityDocumentCollection,
    residentialAddress?: ResidentialAddress
}

export class CreateIdentity extends Domain {
    private path: string = 'api/identities';

    constructor(client: HttpClient) {
        super(client);
    }

    protected buildPayload(param: Identity): object {
        let payload: {[key: string]: string | object | undefined} = {
            [keyConstants._ACCOUNT_REFERENCE]: param.customerDetails.accountReference,
            [keyConstants._MOBILE_NUMBER]: param.customerDetails.mobileNumber,
            [keyConstants._EMAIL]: param.customerDetails.emailAddress,
            [keyConstants._CUSTOMER_IDENTITY]: param.customerIdentity.toArray(),
            [keyConstants._IDENTITY_SHARING]: param.identitySharingCollection.all(),
        }

        if (param.residentialAddress instanceof ResidentialAddress) {
            Object.assign(payload[keyConstants._CUSTOMER_IDENTITY],{
                [keyConstants._RESIDENTIAL_ADDRESS] : param.residentialAddress.toArray()
            })
        }

        if (param.identityDocumentCollection instanceof IdentityDocumentCollection) {
            payload[keyConstants._IDENTITY_DOCUMENTS] = param.identityDocumentCollection.all()
        }

        return payload;
    }

    protected getPath(): string {
        return this.path;
    }
}