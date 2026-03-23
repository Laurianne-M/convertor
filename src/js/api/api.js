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
};


export const getDataFromLocalStorage = () => {
    const dataStringified = localStorage.getItem('data');
    return dataStringified && JSON.parse(dataStringified) || null; 
};

export const areDataOutdated = (receivedAt) => {
    if (!receivedAt || isNaN(Date.parse(receivedAt))) {
        return true; 
    };

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
            };

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
            };

            localStorage.setItem('data', JSON.stringify( {jsonData, receivedAt: new Date() } ));

            return {
                rates: jsonData.rates,
                base: jsonData.base,
            };
        } catch (error) {
            console.warn("API unavailable — using mock data");

            return getMockRates();
        };
    };

    return {
        rates: data.jsonData.rates,
        base: data.jsonData.base,
    }; 

};