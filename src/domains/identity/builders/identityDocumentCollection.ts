import {IdentityDocument} from "./identityDocument";
import {InvalidIdentityDocumentException, InvalidIdentityDocumentMessage} from "../../../exceptions/identity.error";

export class IdentityDocumentCollection {
    private identityDocuments: object[] = [];

    constructor(documents: object[]) {
        documents.forEach((identityDocument) => {
            if (identityDocument instanceof IdentityDocument) {
                this.identityDocuments.push({
                    'type': identityDocument.documentType,
                    'images': identityDocument.imageLinks,
                    'data': {
                        'number': identityDocument.documentNumber,
                    }
                })
            } else {
                throw new InvalidIdentityDocumentException(InvalidIdentityDocumentMessage.EXCEPTION.replace('%s', IdentityDocument.name));
            }
        })
    }

    public static create(identityDocuments: object[]) {
        return new IdentityDocumentCollection(identityDocuments);
    }

    public all(): object[] {
        return this.identityDocuments;
    }
}