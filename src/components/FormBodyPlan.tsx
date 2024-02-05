import { RadioCardContainer, IRadioButtonCardContainerParams } from "./forms/RadioCardContainer"
import { Toggle, IToggleParams } from "./forms/Toggle";
import { useContext } from 'react';
import { AnnualContext } from "./FormCard"
import { FakePlanAPI } from "../interfaces/PlanInterfaces";
import './FormBodyPlan.css';

const DATA_ANNUAL_LIT = 'data-is-annual';
const SUBSCRPT_2_MTH_FREE = '2 months free';

export default function FormBodyPlan({ planType }: { planType: string }) {
    const fakeAPI = FakePlanAPI;
    const annualContext = useContext(AnnualContext);
    const radioButtonContainerParams: IRadioButtonCardContainerParams = {
        name: 'plan',
        cards: [
            {
                id: 'Arcade',
                label: 'Arcade',
                value: 'PL001',
                checked: planType === 'PL001' || planType === null ? true : false,
                registerParams: {
                    required: true,
                },
                imgUrl: '/src/assets/icon-arcade.svg',
                description: annualContext === 'true' ? `$${fakeAPI.getPriceAnnual('PL001')}/yr` : `$${fakeAPI.getPriceMonthly('PL001')}/mo`,
                subscript: SUBSCRPT_2_MTH_FREE
            },
            {
                id: 'Advanced',
                label: 'Advanced',
                value: 'PL002',
                checked: planType === 'PL002' ? true : false,
                registerParams: {
                    required: true,
                },
                imgUrl: '/src/assets/icon-advanced.svg',
                description: annualContext === 'true' ? `$${fakeAPI.getPriceAnnual('PL002')}/yr` : `$${fakeAPI.getPriceMonthly('PL002')}/mo`,
                subscript: SUBSCRPT_2_MTH_FREE
            },
            {
                id: 'Pro',
                label: 'Pro',
                value: 'PL003',
                checked: planType === 'PL003' ? true : false,
                registerParams: {
                    required: true,
                },
                imgUrl: '/src/assets/icon-pro.svg',
                description: annualContext === 'true' ? `$${fakeAPI.getPriceAnnual('PL003')}/yr` : `$${fakeAPI.getPriceMonthly('PL003')}/mo`,
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
            for (let i = 0; i < radioButtonContainerParams.cards.length; i++) {
                labels[i].textContent = `$${fakeAPI.getPriceAnnual(radioButtonContainerParams.cards[i].value)}/yr`;
            }
        } else {
            form.setAttribute(DATA_ANNUAL_LIT, 'false');
            for (let i = 0; i < radioButtonContainerParams.cards.length; i++) {
                labels[i].textContent = `$${fakeAPI.getPriceMonthly(radioButtonContainerParams.cards[i].value)}/mo`;
            }
        }
    }

    return (
        <div className="Card FormBody" tabIndex={0}>
            <h1>Select your plan</h1>
            <p>You have the option of monthly or yearly billing.</p>
            <div
                id="PlanFormInputs"
                className="PlanFormInputs"
                data-is-annual={annualContext ? "true" : "false"}
            >
                <RadioCardContainer params={radioButtonContainerParams} />
                <Toggle params={toggleParams} />
            </div>
        </div>
    )
}