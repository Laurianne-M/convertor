export const getMockRates = () => {
    return {
        success: true,
        timestamp: Date.now(),
        base: "EUR",
        date: "2026-03-12",
        rates: {
            USD: 1.09,
            EUR: 1,
            GBP: 0.86,
            JPY: 162.4,
            CAD: 1.48,
            AUD: 1.66,
            BTC: 0.000015,
            XAU: 0.00047,
            XAG: 0.038
        }
    };
}

// TODO - Maybe add a boolean parameter here that allows us to specific whether or not
// we want real data, or mock data. That way, we do not have to always send a request
// knowing that it will fall, just to supply the fallback data.
export const loadRates = async () => {
    try {

        // TODO - WHY IS THE KEY EMBEDDED IN THE URL? WHAT IF YOU HAD TO CHANGE KEYS?
        // This URL should be declared in a constant, and the key should be declared in a constant too.
        // There should be NO orange within the logic of your code.
        const res = await fetch(
            "https://api.exchangeratesapi.io/v1/latest?access_key=ca1103674bdee54b5f5a046393d48639"
        );

        // If API limit reached or any error
        if (!res.ok) {
            throw new Error("API request failed");
        }

        const data = await res.json();

        return {
            rates: data.rates,
            base: data.base,
        }

    } catch (error) {

        console.warn("API unavailable — using mock data");

       return getMockRates();
    }
}