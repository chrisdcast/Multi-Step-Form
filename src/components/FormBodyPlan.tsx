import { RadioCardContainer, IRadioButtonCardContainerParams } from "./forms/RadioCardContainer"
import { Toggle, IToggleParams } from "./forms/Toggle";
import { useContext } from 'react';
import { AnnualContext } from "./FormCard"

export default function FormBodyPlan({ toggleChange, planType }: { toggleChange(): void, planType: string }) {
    const annual = useContext(AnnualContext);
    const radioButtonContainerParams: IRadioButtonCardContainerParams = {
        name: 'plan',
        cards: [
            {
                id: 'Arcade',
                label: 'Arcade',
                value: 'ARC',
                checked: planType === 'ARC' || planType === null ? true : false,
                imgUrl: '/src/assets/icon-arcade.svg',
                description: annual === 'true' ? '$90/yr' : '$9/mo',
                subscript: annual === 'true' ? '2 months free' : ''
            },
            {
                id: 'Advanced',
                label: 'Advanced',
                value: 'ADV',
                checked: planType === 'ADV' ? true : false,
                imgUrl: '/src/assets/icon-advanced.svg',
                description: annual === 'true' ? '$120/yr' : '$12/mo',
                subscript: annual === 'true' ? '2 months free' : ''
            },
            {
                id: 'Pro',
                label: 'Pro',
                value: 'PRO',
                checked: planType === 'PRO' ? true : false,
                imgUrl: '/src/assets/icon-pro.svg',
                description: annual === 'true' ? '$150/yr' : '$15/mo',
                subscript: annual === 'true' ? '2 months free' : ''
            }]
    }
    const toggleParams: IToggleParams = {
        name: 'annual',
        labelLeft: 'Monthly',
        labelRight: 'Yearly',
        checked: annual === 'true' ? true : false,
        registerParams: {
            onChange: () => { toggleChange() }
        }
    }

    return (
        <div className="Card FormBody">
            <h1>Select your plan</h1>
            <p>You have the option of monthly or yearly billing.</p>
            <RadioCardContainer params={radioButtonContainerParams} />
            <Toggle params={toggleParams} />
        </div>
    )
}