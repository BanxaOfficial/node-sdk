export class DocumentTypeValidationException extends Error {
    code = 422;
    constructor(message: string) {
        super(message);
    }
}

export class InvalidIdentityDocumentException extends Error {
    code = 500;
    constructor(message: string) {
        super(message);
    }
}

export class InvalidIdentityProviderException extends Error {
    code = 500;
    constructor(message: string) {
        super(message);
    }
}

export class InvalidOrMissingImageLinkProtocolException extends Error {
    code = 422;
    constructor(message: string) {
        super(message);
    }
}

export class ResidentialAddressValidationException extends Error {
    code = 422;
    constructor(message: string) {
        super(message);
    }
}

export enum DocumentTypeValidationMessage {
    INVALID_DOCUMENT_TYPE = 'The document type %s must match one of: %t',
    TOO_MANY_IMAGES_EXCEPTION_FOR_DOCUMENT_TYPE = "Too many documents provided for %s",
    MULTIPLE_IMAGES_REQUIRED_EXCEPTION = "The provided %s requires multiple image links",
    MISSING_IMAGE_LINKS = "Please provide a image links to the document for %s",
    DOCUMENT_NUMBER_NOT_REQUIRED_FOR_DOCUMENT_TYPE = "Document type %s does not require a document number, the documents requiring a document number are %s",
}

export enum InvalidIdentityDocumentMessage {
    EXCEPTION = 'Provided identity document should consist only of %s types'
}

export enum InvalidIdentityProviderMessage {
    EXCEPTION = "Provided identity providers should consist only of %s types",
}

export enum InvalidOrMissingImageLinkProtocolMessage {
    EXCEPTION = "Invalid protocol provided for image URL %s",
}

export enum ResidentialAddressValidationMessage {
    EXCEPTION = 'Country must be a ISO 3166 two letter country code',
}