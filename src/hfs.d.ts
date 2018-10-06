interface APIResponse {
    COLUMNS: string[];
    DATA: any[][];
}

type RawEntity = {[key: string]: any}

interface DiningHall {
    id: number;
    name: string;
    campusCode: string;
    longitude: number;
    latitude: number;
}

interface Location {
    menuCategoryNumber: string;
    menuCategoryName: string;
    locationNumber: string;
    locationName: string;
}

interface LocationHoursRaw extends LocationHours {
    menuCategoryNumber: string | null;
}

interface LocationHours {
    dayOfWeekStart: number;
    dayOfWeekEnd?: number;
    timeOpen: string;
    timeClosed: string;
}

type DiningHallHours = {[id: number]: LocationHours};

interface Campus {
    campusCode: string;
    campusName: string;
    rssLink: string;
}
type MealName = 'Breakfast' | 'Lunch' | 'Dinner' | 'Dinner/Late Night';

interface MenuItem {
    id: number;
    serveDate: string;
    mealNumber: 1 | 2 | 3 | 4;
    mealName: MealName;
    locationNumber: number;
    locationName: string;
    menuCategoryNumber: number;
    menuCategoryName: string;
    recipeNumber: number;
    recipeName: string;
    recipePrintAsName: string;
    ingredientList: string;
    allergens: string;
    recipePrintAsColor: string;
    recipePrintAsCharacter: string;
    recipeProductInformation: string;
    sellingPrice: string;
    portionCost: string;
    productionDepartment: string;
    serviceDepartment: string;
    cateringDepartment: string;
    recipeWebCodes: string;
    serviceSize: string;
    calories: string;
    caloriesFromFat: string;
    totalFat: string;
    totalFatDv: string;
    satFat: string;
    satFatDv: string;
    transFat: string;
    transFatDv: string;
    cholesterol: string;
    cholesterolDv: string;
    sodium: string;
    sodiumDv: string;
    totalCarb: string;
    totalCarbDv: string;
    dietaryFiber: string;
    dietaryFiberDv: string;
    sugars: string;
    sugarsDv: string;
    protein: string;
    proteinDv: string;
}

type Menu = {[meal: string]: {[place: string]: MenuItem[]}};
