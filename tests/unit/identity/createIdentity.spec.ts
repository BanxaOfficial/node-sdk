import {
    DocumentTypeValidationMessage,
    InvalidIdentityDocumentMessage,
    InvalidIdentityProviderMessage,
    InvalidOrMissingImageLinkProtocolMessage,
    ResidentialAddressValidationMessage
} from "../../../src/exceptions/identity.error";
import {IdentitySharingCollection} from "../../../src/domains/identity/builders/identitySharingCollection";
import {IdentitySharingProvider} from "../../../src/domains/identity/builders/identitySharingProvider";
import {IdentityDocumentCollection} from "../../../src/domains/identity/builders/identityDocumentCollection";
import {DOCUMENT_TYPES, IdentityDocument} from "../../../src/domains/identity/builders/identityDocument";
import {ResidentialAddress} from "../../../src/domains/identity/builders/residentialAddress";
import {expect} from "chai";

describe('Create Identity Tests', function () {
    it('cannot create identity with invalid country code',  async function () {
        try {
            ResidentialAddress.create('Mars')
        } catch (e: any) {
            expect(e.message).to.equal(ResidentialAddressValidationMessage.EXCEPTION);
            expect(e.code).to.equal(422)
        }
    });

    it('cannot create identity with invalid document type',  async function () {
        try {
            IdentityDocument.create('FOOBAR',
                ['https://www.orimi.com/pdf-test.pdf'],
                'BTCBaz007'
            )
        } catch (e: any) {
            expect(e.message).to.equal(DocumentTypeValidationMessage.INVALID_DOCUMENT_TYPE
                .replace('%s', 'FOOBAR')
                .replace('%t', Object.values(DOCUMENT_TYPES).join(' ')));
            expect(e.code).to.equal(422)
        }
    });

    it('rejects image links with invalid protocol',  async function () {
        try {
            IdentityDocument.create(DOCUMENT_TYPES.DOCUMENT_TYPE_DRIVING_LICENCE,
                ['https://valid.url', 'invalid.link'],
                'BTCBaz007'
            )
        } catch (e: any) {
            expect(e.message).to.equal(InvalidOrMissingImageLinkProtocolMessage.EXCEPTION.replace('%s', 'invalid.link'));
            expect(e.code).to.equal(422)
        }
    });

    it('rejects more than two image links for document type passport',  async function () {
        try {
            IdentityDocument.create(DOCUMENT_TYPES.DOCUMENT_TYPE_PASSPORT,
                ['https://valid.url', 'https://valid2.url'],
                'BTCBaz007'
            )
        } catch (e: any) {
            expect(e.message).to.equal(
                DocumentTypeValidationMessage.TOO_MANY_IMAGES_EXCEPTION_FOR_DOCUMENT_TYPE
                    .replace('%s', DOCUMENT_TYPES.DOCUMENT_TYPE_PASSPORT)
            );
            expect(e.code).to.equal(422)
        }
    });

    it('rejects rejects document number if not required for document type',  async function () {
        try {
            IdentityDocumentCollection.create([
                IdentityDocument.create(DOCUMENT_TYPES.DOCUMENT_TYPE_SELFIE,
                    ['https://valid.url', 'https://valid2.url'],
                    'BTCBaz007'
                )
            ])
        } catch (e: any) {
            expect(e.message).to.equal(
                DocumentTypeValidationMessage.DOCUMENT_NUMBER_NOT_REQUIRED_FOR_DOCUMENT_TYPE
                    .replace('%s', DOCUMENT_TYPES.DOCUMENT_TYPE_SELFIE)
                    .replace('%t', [
                        DOCUMENT_TYPES.DOCUMENT_TYPE_PASSPORT,
                        DOCUMENT_TYPES.DOCUMENT_TYPE_DRIVING_LICENCE,
                        DOCUMENT_TYPES.DOCUMENT_TYPE_IDENTIFICATION
                    ].join(' '))
            );
            expect(e.code).to.equal(422)
        }
    });

    it('rejects invalid input type for document collection',  async function () {
        try {
            IdentityDocumentCollection.create([{}])
        } catch (e: any) {
            expect(e.message).to.equal(
                InvalidIdentityDocumentMessage.EXCEPTION
                    .replace('%s', IdentityDocument.name)
            );
            expect(e.code).to.equal(500)
        }
    });

    it('rejects invalid input type for identity provider',  async function () {
        try {
            IdentitySharingCollection.create([{}])
        } catch (e: any) {
            expect(e.message).to.equal(
                InvalidIdentityProviderMessage.EXCEPTION
                    .replace('%s', IdentitySharingProvider.name)
            );
            expect(e.code).to.equal(500)
        }
    });
});

