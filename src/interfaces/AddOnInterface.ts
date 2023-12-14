import { getPricePerYear } from "./PlanInterfaces";

export interface AddOn {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    pricePerYear(perMo: number): number;
};

export const ActiveAddOns: AddOn[] = [
    {
        id: 'AO001',
        name: 'Online service',
        description: 'Access to multiplayer games',
        price: 1,
        pricePerYear: getPricePerYear
    },
    {
        id: 'AO002',
        name: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        price: 2,
        pricePerYear: getPricePerYear
    },
    {
        id: 'AO003',
        name: 'Customizable profile',
        description: 'Custom theme on your profile',
        price: 2,
        pricePerYear: getPricePerYear
    }
]