export interface AddOn {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly pricePerMo: number;
};

export const ActiveAddOns: AddOn[] = [
    {
        id: 'AO001',
        name: 'Online service',
        description: 'Access to multiplayer games',
        pricePerMo: 1,
    },
    {
        id: 'AO002',
        name: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        pricePerMo: 2,
    },
    {
        id: 'AO003',
        name: 'Customizable profile',
        description: 'Custom theme on your profile',
        pricePerMo: 2,
    }
]

const getAddOn = (id: string) => {
    const ao = ActiveAddOns.filter((ao) => ao.id === id);
    return ao[0];
}

const getAddOns = (idArray: string[]) => {
    return ActiveAddOns.filter((ao) => idArray.includes(ao.id))
}

const getPriceMonthly = (id: string): number => {
    const ao = getAddOn(id);
    if (!ao) {
        console.log('fakeAPI:getPriceMonthly:AddOn not found');
        return 0;
    }
    return ao.pricePerMo;
}

const getPriceAnnual = (id: string): number => {
    const ao = getAddOn(id);
    if (!ao) {
        console.log('fakeAPI:getPriceAnnual:AddOn not found');
        return 0;
    }
    return ao.pricePerMo * 10;
}

export const FakeAddOnAPI = {
    getAddOn,
    getAddOns,
    getPriceMonthly,
    getPriceAnnual
}