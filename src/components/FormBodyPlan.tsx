import { RadioCardContainer, IRadioButtonCardContainerParams } from "./forms/RadioCardContainer"
import { Toggle, IToggleParams } from "./forms/Toggle";
import { useContext, useEffect } from 'react';
import { AnnualContext } from "./FormCard"
import { FakePlanAPI } from "../interfaces/PlanInterfaces";
import './FormBodyPlan.css';

const DATA_ANNUAL_LIT = 'data-is-annual';
const SUBSCRPT_2_MTH_FREE = '2 months free';

export default function FormBodyPlan({ planChange, toggleChange, planType }: { planChange(value: string): void, toggleChange(): void, planType: string }) {
    const fakeAPI = FakePlanAPI;
    const annualContext = useContext(AnnualContext);
    const radioButtonContainerParams: IRadioButtonCardContainerParams = {
        name: 'plan',
        cards: [
            {
                id: 'Arcade',
                label: 'Arcade',
                value: 'ARC',
                checked: planType === 'ARC' || planType === null ? true : false,
                registerParams: {
                    required: true,
                },
                imgUrl: '/src/assets/icon-arcade.svg',
                description: annualContext === 'true' ? `$${fakeAPI.getPriceAnnual('Arcade')}/yr` : `$${fakeAPI.getPriceMonthly('Arcade')}/mo`,
                subscript: SUBSCRPT_2_MTH_FREE
            },
            {
                id: 'Advanced',
                label: 'Advanced',
                value: 'ADV',
                checked: planType === 'ADV' ? true : false,
                registerParams: {
                    required: true,
                },
                imgUrl: '/src/assets/icon-advanced.svg',
                description: annualContext === 'true' ? `$${fakeAPI.getPriceAnnual('Arcade')}/yr` : `$${fakeAPI.getPriceMonthly('Arcade')}/mo`,
                subscript: SUBSCRPT_2_MTH_FREE
            },
            {
                id: 'Pro',
                label: 'Pro',
                value: 'PRO',
                checked: planType === 'PRO' ? true : false,
                registerParams: {
                    required: true,
                },
                imgUrl: '/src/assets/icon-pro.svg',
                description: annualContext === 'true' ? `$${fakeAPI.getPriceAnnual('Arcade')}/yr` : `$${fakeAPI.getPriceMonthly('Arcade')}/mo`,
                subscript: SUBSCRPT_2_MTH_FREE
            }]
    }
    const toggleParams: IToggleParams = {
        name: 'annual',
        labelLeft: 'Monthly',
        labelRight: 'Yearly',
        checked: annualContext === 'true' ? true : false,
        registerParams: {
            onChange: () => { handleToggleChange() }
        }
    }

    const handleToggleChange = () => {
        const form = document.getElementById('PlanFormInputs');
        if (!form) {
            console.log('FormBodyPlan:handleToggleChange:form element not found');
            return;
        }
        const labels = document.getElementsByClassName('Description');
        if (!labels) {
            console.log('FormBodyPlan:handleToggleChange:labels element not found');
            return;
        }
        if (form.getAttribute(DATA_ANNUAL_LIT) === 'false') {
            form.setAttribute(DATA_ANNUAL_LIT, 'true');
            for (let label in labels) {
                labels[label].textContent = `$${fakeAPI.getPriceAnnual(radioButtonContainerParams.cards[label].id)}/yr`
            }
        } else {
            form.setAttribute(DATA_ANNUAL_LIT, 'false');
            for (let label in labels) {
                labels[label].textContent = `$${fakeAPI.getPriceMonthly(radioButtonContainerParams.cards[label].id)}/mo`
            }
        }
    }

    return (
        <div className="Card FormBody">
            <h1>Select your plan</h1>
            <p>You have the option of monthly or yearly billing.</p>
            <div id="PlanFormInputs" className="PlanFormInputs" data-is-annual="false">
                <RadioCardContainer params={radioButtonContainerParams} />
                <Toggle params={toggleParams} />
            </div>
        </div>
    )
}