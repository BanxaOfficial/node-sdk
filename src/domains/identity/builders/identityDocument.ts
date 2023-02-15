import {
    DocumentTypeValidationException, DocumentTypeValidationMessage,
    InvalidOrMissingImageLinkProtocolException, InvalidOrMissingImageLinkProtocolMessage
} from "../../../exceptions/identity.error";

export const DOCUMENT_TYPES = {
    DOCUMENT_TYPE_DRIVING_LICENCE: 'DRIVING_LICENSE',
    DOCUMENT_TYPE_PASSPORT: 'PASSPORT',
    DOCUMENT_TYPE_IDENTIFICATION: 'IDENTIFICATION',
    DOCUMENT_TYPE_SELFIE: 'SELFIE',
    DOCUMENT_TYPE_PROOF_OF_ADDRESS: 'PROOF_OF_ADDRESS',
}

export class IdentityDocument {
    private readonly _documentType: string;
    private readonly _imageLinks: string[];
    private readonly _documentNumber?: string;

    constructor(documentType: string, imageLinks: string[], documentNumber?: string) {
        this._documentType = documentType;
        this._imageLinks = imageLinks;
        this._documentNumber = documentNumber;
        this.validateDocumentsInput(documentType, imageLinks);
    }

    public static create(documentType: string, imageLinks: string[], documentNumber?: string) {
        return new IdentityDocument(documentType, imageLinks, documentNumber)
    }

    protected validateDocumentsInput(type: string, imageLinks: string[]) {
        this.validateDocumentType(type);
        this.validateDocumentNumberRequirement(type);
        if (!imageLinks.length) {
            throw new DocumentTypeValidationException(DocumentTypeValidationMessage.MISSING_IMAGE_LINKS.replace('%s', type));
        }
        if (imageLinks.length == 1 && this.typeRequiresMultipleDocuments(type)) {
            throw new DocumentTypeValidationException(DocumentTypeValidationMessage.MULTIPLE_IMAGES_REQUIRED_EXCEPTION.replace('%s', type));
        }
        if (imageLinks.length == 2 && !this.typeRequiresMultipleDocuments(type)) {
            throw new DocumentTypeValidationException(DocumentTypeValidationMessage.TOO_MANY_IMAGES_EXCEPTION_FOR_DOCUMENT_TYPE.replace('%s', type));
        }
        if (imageLinks.length > 2) {
            throw new DocumentTypeValidationException(DocumentTypeValidationMessage.TOO_MANY_IMAGES_EXCEPTION_FOR_DOCUMENT_TYPE.replace('%s', type));
        }
    }

    protected validateDocumentType(type: string) {
        if (!Object.values(DOCUMENT_TYPES).includes(type)) {
            throw new DocumentTypeValidationException(
                DocumentTypeValidationMessage.INVALID_DOCUMENT_TYPE
                    .replace('%s', type)
                    .replace('%t', Object.values(DOCUMENT_TYPES).join(' '))
            );
        }
    }

    protected validateDocumentNumberRequirement(type: string) {
        if (![
            DOCUMENT_TYPES.DOCUMENT_TYPE_PASSPORT,
            DOCUMENT_TYPES.DOCUMENT_TYPE_DRIVING_LICENCE,
            DOCUMENT_TYPES.DOCUMENT_TYPE_IDENTIFICATION,
        ].includes(type)) {
            throw new DocumentTypeValidationException(
                DocumentTypeValidationMessage.DOCUMENT_NUMBER_NOT_REQUIRED_FOR_DOCUMENT_TYPE
                    .replace('%s', type)
                    .replace('%t', [
                        DOCUMENT_TYPES.DOCUMENT_TYPE_PASSPORT,
                        DOCUMENT_TYPES.DOCUMENT_TYPE_DRIVING_LICENCE,
                        DOCUMENT_TYPES.DOCUMENT_TYPE_IDENTIFICATION
                    ].join(' '))
            );
        }
    }

    private typeRequiresMultipleDocuments(type: string) {
        return [
            DOCUMENT_TYPES.DOCUMENT_TYPE_DRIVING_LICENCE,
            DOCUMENT_TYPES.DOCUMENT_TYPE_IDENTIFICATION
        ].includes(type);
    }

    public get imageLinks(): object[] {
        let links: object[] = [];
        this._imageLinks.forEach((link) => {
            if (!link.startsWith('https://')) {
                throw new InvalidOrMissingImageLinkProtocolException(
                    InvalidOrMissingImageLinkProtocolMessage.EXCEPTION.replace('%s', link)
                );
            }
            links.push({"link": link});
        })
        return links;
    }

    public get documentType(): string {
        return this._documentType;
    }

    public get documentNumber(): string | undefined {
        return this._documentNumber;
    }
}
