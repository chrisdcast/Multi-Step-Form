export const PRICEANNUALDISCOUNT: number = 2;
export const getPricePerYear = (perMo: number) => (perMo * 12) - (perMo * PRICEANNUALDISCOUNT);

export interface PlanType {
    readonly id: string;
    readonly name: string;
    readonly pricePerMo: number;
};

export const ActivePlanTypes: PlanType[] = [
    {
        id: 'PL001',
        name: 'Arcade',
        pricePerMo: 9,
    },
    {
        id: 'PL002',
        name: 'Advanced',
        pricePerMo: 12,
    },
    {
        id: 'PL003',
        name: 'Pro',
        pricePerMo: 15,
    }
];

const getPlan = (id: string) => {
    const plan = ActivePlanTypes.filter((pl) => pl.id === id);
    return plan[0];
}

const getPriceMonthly = (id: string): number => {
    const plan = getPlan(id);
    if (!plan) {
        console.log('fakePlanAPI:getPriceMonthly:Plan not found');
        return 0;
    }
    return plan.pricePerMo;
}

const getPriceAnnual = (id: string): number => {
    const plan = getPlan(id);
    if (!plan) {
        console.log('fakePlanAPI:getPriceAnnual:Plan not found');
        return 0;
    }
    return plan.pricePerMo * 10;
}

export const FakePlanAPI = {
    getPlan,
    getPriceMonthly,
    getPriceAnnual
}