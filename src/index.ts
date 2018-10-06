import api from './api';

async function main() {
    // const campuses = await api.getCampuses();
    // console.log(campuses);

    // const diningHalls = await api.getDiningHalls();
    // console.log(diningHalls);

    // const hours = await api.getHours();
    // console.log(hours);

    const locationNumber = '13';

    // const locations = await api.getLocations(locationNumber);
    // console.log(locations);

    const date = '10/6/2018';

    const menu = await api.getMenu(date, locationNumber);
    console.log(JSON.stringify(menu));
}

main();