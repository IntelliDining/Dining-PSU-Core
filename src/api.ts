import 'isomorphic-unfetch';

const base = 'http://api.absecom.psu.edu/rest/';

function get<T>(endpoint: string, data?: {[key: string]: any}): Promise<T[]> {
    let query: string;

    if (data) {
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => params.append(key, data[key]));
        query = '?' + params.toString();
    }

    else {
        query = '';
    }

    return fetch(base + endpoint + '/v1/221723' + query)
        .then(resp => resp.json())
        // .then(json => {console.log(json); return json})
        .then((json: APIResponse) => json.DATA.map(datum => json.COLUMNS.reduce((obj, k, i) => ({...obj, [k]: datum[i]}), {})))
        .then((data: RawEntity[]) => data.map(datum => rename(datum)));
}

function rename(input: RawEntity): any {
    return Object.keys(input).reduce((obj, k) => ({...obj, [toCamelCase(k)]: input[k]}), {});
}

function toCamelCase(input: string): string {
    return input.toLowerCase().split('_').map((str, i) => i > 0 ? str[0].toUpperCase() + str.substr(1) : str).join('');
}

function getCampuses(): Promise<Campus[]> {
    return get<Campus>('facilities/campuses');
}

function getDiningHalls(): Promise<DiningHall[]> {
    return get<DiningHall>('facilities/areas');
}

async function getHours(): Promise<DiningHallHours> {
    const data = await get<LocationHoursRaw>('facilities/hours');
    const keys = data.map(datum => datum.menuCategoryNumber).filter((k): k is string => k != null);
    return keys.reduce((obj, k) => ({...obj, [k]: data.filter(datum => datum.menuCategoryNumber === k)}), {});
}

function getLocations(location: string): Promise<Location[]> {
    return get<Location>('facilities/locations', {location});
}

async function getMenu(date: string, location: string): Promise<Menu> {
    const data = await get<MenuItem>('services/food/menus', {date, location});
    const meals = data.map(datum => datum.mealName).filter((value, index, self) => self.indexOf(value) == index);
    const places = data.map(datum => datum.menuCategoryName).filter((value, index, self) => self.indexOf(value) === index);
    return meals.reduce((obj, k) => ({...obj, [k]: places.reduce((obj1, k1) => ({...obj1, [k1]: data.filter(datum => datum.mealName === k && datum.menuCategoryName === k1)}), {})}), {});
}

export default {
    getDiningHalls,
    getCampuses,
    getHours,
    getLocations,
    getMenu
}