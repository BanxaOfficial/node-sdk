import {InvalidIdentityProviderException, InvalidIdentityProviderMessage} from "../../../exceptions/identity.error";
import {IdentitySharingProvider} from "./identitySharingProvider";

export class IdentitySharingCollection {
    private identitySharingProviders: object[] = [];

    constructor(providers: object[]) {
        providers.forEach((identitySharingProvider) => {
            if (identitySharingProvider instanceof IdentitySharingProvider) {
                this.identitySharingProviders.push({
                    'provider': identitySharingProvider.provider,
                    'token': identitySharingProvider.token,
                })
            } else {
                throw new InvalidIdentityProviderException(InvalidIdentityProviderMessage.EXCEPTION.replace('%s', IdentitySharingProvider.name));
            }
        })
    }

    public static create(identitySharingProviders: object[]) {
        return new IdentitySharingCollection(identitySharingProviders);
    }

    public all(): object {
        return this.identitySharingProviders;
    }
}
