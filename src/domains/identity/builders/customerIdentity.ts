import {keyConstants} from "../../../library/keyConstants";

export class CustomerIdentity {
    private readonly _givenName: string;
    private readonly _surname: string;
    private readonly _dateOfBirth: string;

    constructor(givenName: string, surname: string, dateOfBirth: string) {
        this._givenName = givenName;
        this._surname = surname;
        this._dateOfBirth = dateOfBirth;
    }

    public static create(givenName: string, surname: string, dateOfBirth: string) {
        return new CustomerIdentity(givenName, surname, dateOfBirth);
    }

    public toArray(): object {
        return {
            [keyConstants._GIVEN_NAME] : this.givenName,
            [keyConstants._SURNAME] : this.surname,
            [keyConstants._DATE_OF_BIRTH] : this.dateOfBirth,
        }
    }

    private get givenName(): string {
        return this._givenName;
    }

    private get surname(): string {
        return this._surname;
    }

    private get dateOfBirth(): string {
        return this._dateOfBirth;
    }
}