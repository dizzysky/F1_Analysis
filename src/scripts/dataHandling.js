export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    } catch (error) {
        console.error("Error fetching data from:", url, error);
        return null;
    }
}

export async function fetchRaceDetails(index) {
    const url = `https://ergast.com/api/f1/1988/${index + 1}/results.json`;
    const data = await fetchData(url);
    return data?.MRData?.RaceTable?.Races[0] ?? null;
}

export async function fetchWeatherData(latitude, longitude) {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2023-08-11&end_date=2023-08-25&hourly=temperature_2m,precipitation`;
    return await fetchData(url);
}

export async function getDriverNationalities(season) {
    const url = `https://ergast.com/api/f1/${season}/drivers.json`;
    const data = await fetchData(url);
    const nationalities = {};

    for (const driver of data?.MRData?.DriverTable?.Drivers || []) {
        nationalities[driver.nationality] =
            (nationalities[driver.nationality] || 0) + 1;
    }

    return nationalities;
}

export async function getScatterData(season) {
    const url = `https://ergast.com/api/f1/${season}.json`;
    const response = await fetchData(url);
    const races = response?.MRData?.RaceTable?.Races || [];

    const driverData = {};
    for (const race of races) {
        const raceUrl = `https://ergast.com/api/f1/${season}/${race.round}/results.json`;
        const raceResponse = await fetchData(raceUrl);
        const results =
            raceResponse?.MRData?.RaceTable?.Races[0]?.Results || [];

        results.forEach((result) => {
            const driverId = result.Driver.driverId;
            if (!driverData[driverId]) {
                driverData[driverId] = { races: 0, podiums: 0 };
            }
            driverData[driverId].races++;
            if (parseInt(result.position) <= 3) {
                driverData[driverId].podiums++;
            }
        });
    }

    return Object.entries(driverData).map(([driverId, data]) => ({
        x: data.races,
        y: data.podiums,
    }));
}
