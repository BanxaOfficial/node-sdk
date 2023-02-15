import {orderStatus} from "../../library/orderStatus";
import {keyConstants} from "../../library/keyConstants";
import {InvalidOrderStatusError, InvalidOrderStatusMessage} from "../../exceptions/invalidOrderStatus.error";
import HttpClient from "../../client/httpClient";
import {Domain} from "../domain";

export class GetOrders extends Domain {
    private ORDER_STATUSES = [
        orderStatus.PENDING_PAYMENT,
        orderStatus.WAITING_PAYMENT,
        orderStatus.PAYMENT_RECEIVED,
        orderStatus.IN_PROGRESS,
        orderStatus.COIN_TRANSFERRED,
        orderStatus.CANCELLED,
        orderStatus.DECLINED,
        orderStatus.EXPIRED,
        orderStatus.COMPLETE,
        orderStatus.REFUNDED,
    ];

    private path: string = 'api/orders';
    private _startDate: string = '';
    private _endDate: string = '';
    private _statuses: string[] = [];
    private _perPage: string | number = '';
    private _page: string | number = '';
    private _accountReference?: string;

    constructor(client: HttpClient) {
        super(client);
    }

    private buildPath(): string {
        // @ts-ignore
        return this.path + '?' + new URLSearchParams(this.buildParameters()).toString();
    }

    protected getPath(): string {
        return this.buildPath();
    }

    private buildParameters(): object {
        const payload: {[key: string]: string | undefined} = {
            [keyConstants._START_DATE] : this.startDate,
            [keyConstants._END_DATE] : this.endDate,
            [keyConstants._STATUS] : this.status,
            [keyConstants._PER_PAGE] : this.perPage,
            [keyConstants._PAGE] : this.page,
            [keyConstants._ACCOUNT_REFERENCE] : this.accountReference,
        }
        for (const key in payload) {
            if (payload[key] === undefined) {
                delete payload[key];
            }
        }

        return payload;
    }

    private get startDate(): string {
        return this._startDate;
    }

    public setStartDate(startDate: string): GetOrders {
        this._startDate = startDate;
        return this;
    }

    private get endDate(): string {
        return this._endDate;
    }

    public setEndDate(endDate: string): GetOrders {
        this._endDate = endDate;
        return this;
    }

    private get status(): string {
        return this._statuses ? this._statuses.join(','): '';
    }

    public setStatuses(statuses: string[] = []): GetOrders {
        this.validateOrderStatuses(statuses);
        this._statuses = statuses;
        return this;
    }

    private get perPage(): string {
        return this._perPage?.toString();
    }

    public setPerPage(perPage: string | number): GetOrders {
        this._perPage = perPage?.toString();
        return this;
    }

    private get page(): string {
        return this._page?.toString();
    }

    public setPage(page: string | number): GetOrders {
        this._page = page?.toString();
        return this;
    }

    private get accountReference(): string | undefined {
        return this._accountReference;
    }

    public setAccountReference(accountReference?: string): GetOrders {
        this._accountReference = accountReference;
        return this;
    }

    private validateOrderStatuses(statuses: string[]): void {
        const result = statuses.filter((value: string) => this.ORDER_STATUSES.includes(value));
        if (result.length < statuses.length) {
            throw new InvalidOrderStatusError(InvalidOrderStatusMessage.EXCEPTION);
        }
    }
}