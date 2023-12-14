export const PRICEANNUALDISCOUNT: number = 2;
export const getPricePerYear = (perMo: number) => (perMo * 12) - (perMo * PRICEANNUALDISCOUNT);

export interface PlanType {
    readonly id: string;
    readonly name: string;
    readonly pricePerMo: number;
    pricePerYear(perMo: number): number;
};

export const ActivePlanTypes: PlanType[] = [
    {
        id: 'PL001',
        name: 'Arcade',
        pricePerMo: 9,
        pricePerYear: getPricePerYear
    },
    {
        id: 'PL002',
        name: 'Advanced',
        pricePerMo: 12,
        pricePerYear: getPricePerYear
    },
    {
        id: 'PL003',
        name: 'Pro',
        pricePerMo: 15,
        pricePerYear: getPricePerYear
    }
];