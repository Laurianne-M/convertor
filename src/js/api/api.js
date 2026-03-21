import { DAY_IN_MILLISECONDS, API_BASE_URL, API_KEY } from "../constants.js";

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
/*export const loadRates = async () => {
    try {

        // TODO - WHY IS THE KEY EMBEDDED IN THE URL? WHAT IF YOU HAD TO CHANGE KEYS?
        // This URL should be declared in a constant, and the key should be declared in a constant too.
        // There should be NO orange within the logic of your code.
        // TODO - stocker la reponse de la requete API dans le cache (local storage) avec une date d'expiration (ttl)
        const res = await fetch(
            API_EXCHANGE_RATES_URL
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
};*/


const getDataFromLocalStorage = () => {
    const dataStringified = localStorage.getItem('data');
    return dataStringified && JSON.parse(dataStringified) || null; 
};

const areDataOutdated = (receivedAt) => {
    if (!receivedAt || isNaN(Date.parse(receivedAt))) {
        return true; 
    }

    // Take the actual date and remove 24 hours
    const checkDate = new Date(new Date().getTime() - DAY_IN_MILLISECONDS); 
    // If the data received is lower than the checkDate, then data is outdated
    return new Date(receivedAt).getTime() < checkDate.getTime(); 
}; 

export const loadRates = async () => {
    const data = getDataFromLocalStorage(); 

    if (!data || areDataOutdated(data && data.receivedAt)) {
        try { 
            const params = {
                access_key : API_KEY,
            }

            const queryString = new URLSearchParams(params).toString();
            const urlWithParams = `${API_BASE_URL}?${queryString}`;
            const res = await fetch(urlWithParams);
            const jsonData = await res.json();

            if (!jsonData.rates) { // API returned an error
                console.warn("API unavailable — using mock data");
                const mockData = getMockRates();
                localStorage.setItem('data', JSON.stringify( {jsonData: mockData, receivedAt: new Date() } ));
                return {
                    rates: mockData.rates,
                    base: mockData.base
                };
            }

            localStorage.setItem('data', JSON.stringify( {jsonData, receivedAt: new Date() } ));

            return {
            rates: jsonData.rates,
            base: jsonData.base,
            };
        } catch (error) {
            console.warn("API unavailable — using mock data");

            return getMockRates();
        }
    }

    return {
        rates: data.jsonData.rates,
        base: data.jsonData.base,
    }; 

};