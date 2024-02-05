import { useState, createContext, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler, set } from "react-hook-form";
import { IRegisterFormInfo } from "../interfaces/FormInterfaces";
import { IStepParams } from "./Step";
import StepContainer from "./StepContainer";
import FormBodyPersonal from './FormBodyPersonal';
import FormBodyPlan from './FormBodyPlan';
import FormBodyAddOns from "./FormBodyAddOns";
import { FormBodyReview } from "./FormBodyReview";
import FormButtonContainer from "./FormButtonContainer";
import "./Card.css";
import "./FormCard.css";

export const StepContext = createContext<number>(1);
export const AnnualContext = createContext<string>('');
const stepLiterals: IStepParams[] = [
    {
        label: 'Step 1',
        text: 'Your Info'
    },
    {
        label: 'Step 2',
        text: 'Select Plan'
    },
    {
        label: 'Step 3',
        text: 'Add-Ons'
    },
    {
        label: 'Step 4',
        text: 'Summary'
    }
];

export function FormCard() {
    // Methods for FormProvider
    const methods = useForm<IRegisterFormInfo>({ defaultValues: { plan: 'PL001', addOns: [''] } });
    // Intializing step counter for rendering different forms.
    const [stepState, setStepState] = useState<number>(1);
    // Form data object
    const [formInfoState, setFormInfo] = useState<IRegisterFormInfo>({
        name: '',
        email: '',
        phone: '',
        plan: '',
        annual: '',
        addOns: []
    });

    // Submit handler for form
    const formSubmit: SubmitHandler<IRegisterFormInfo> = (data, e) => {
        e?.preventDefault();
        setFormInfo({ ...formInfoState, ...data });
        setStepState(stepState + 1);
        // const form = document.getElementById('FormContainer');
        // console.log(form);
        // if (form) {
        //     form.focus();
        // }
    }

    // Handler for Go Back button
    const handlePrev = () => {
        if (stepState > 1) setStepState(stepState - 1);
    }

    // Handler for plan change link on review screen.
    const handleReviewPlanChange = () => {
        setStepState(2);
    }

    useEffect(() => {
        console.log(formInfoState);
        //Getting the form and first available input for refocusing the tab index.
        const form = document.getElementById('FormContainer');
        if (!form) {
            console.log('FormCard:useEffect:form not found');
            return;
        }
        const nextInput = form.getElementsByTagName('input');
        if (!nextInput) {
            console.log('FormCard:useEffect:nextInput not found')
            return;
        }
        nextInput[0].focus();
    })

    return (
        <div className="Card FormCard">
            <StepContext.Provider value={stepState}>
                <StepContainer stepInfo={stepLiterals} />
                <AnnualContext.Provider value={formInfoState.annual}>
                    <FormProvider {...methods}>
                        <form
                            id="FormContainer"
                            className="FormContainer"
                            onSubmit={methods.handleSubmit(formSubmit)}
                        >
                            {
                                (() => {
                                    console.log('switch statement started', stepState);
                                    switch (stepState) {
                                        case 1:
                                            return <FormBodyPersonal />
                                        case 2:
                                            return <FormBodyPlan
                                                planType={formInfoState.plan}
                                            />
                                        case 3:
                                            return <FormBodyAddOns
                                                currentAddOns={formInfoState.addOns}
                                            />
                                        case 4:
                                            return <FormBodyReview
                                                plan={formInfoState.plan}
                                                addOns={formInfoState.addOns}
                                                onPlanChange={handleReviewPlanChange}
                                            />
                                        default:
                                            console.log('This was hit somehow');
                                    }
                                }
                                )()
                            }
                            <FormButtonContainer handlePrev={handlePrev} />
                        </form>
                    </FormProvider>
                </AnnualContext.Provider>
            </StepContext.Provider>
        </div>
    );
}