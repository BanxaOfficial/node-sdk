export class CryptoCurrencyResponse {
    public static get() {
        return {
            "data": {
                "coins": {
                    "coin_code": "BTC",
                    "coin_name": "Bitcoin",
                    "blockchains": [
                        {
                            "code": "BTC",
                            "description": "Bitcoin",
                            "is_default": true
                        }
                    ]
                }
            }
        }
    }
}