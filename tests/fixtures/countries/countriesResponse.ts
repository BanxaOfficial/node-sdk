export class CountriesResponse {
    public static get() {
        return {
            "data": {
                "countries": [
                    {
                        "country_code": "AU",
                        "country_name": "Australia"
                    }
                ]
            }
        }
    }
}