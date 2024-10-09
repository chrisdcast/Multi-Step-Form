import { useState, createContext, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { IRegisterFormInfo } from "../interfaces/FormInterfaces";
import { IStepParams } from "./Step";
import StepContainer from "./StepContainer";
import FormBodyPersonal from './FormBodyPersonal';
import FormBodyPlan from './FormBodyPlan';
import FormBodyAddOns from "./FormBodyAddOns";
import { FormBodyReview } from "./FormBodyReview";
import { FormBodyComplete } from "./FormBodyComplete";
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
    // Flag for refocusing after a rerender. Refocusing should
    // only occur when the Next Step or Prev Step buttons are clicked.
    const [refocusFlag, setRefocusFlag] = useState<boolean>(false);
    // Flag to skip updating the step number.
    const [skipStepFlag, setSkipStepFlag] = useState<boolean>(false);
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
        console.log('formSubmit', skipStepFlag);
        if (skipStepFlag) {
            setSkipStepFlag(false);
            return;
        }
        e?.preventDefault();
        setFormInfo({ ...formInfoState, ...data });
        setStepState(stepState + 1);
        setRefocusFlag(true);
    }

    // Handler for Go Back button
    const handlePrev = () => {
        if (stepState > 1) setStepState(stepState - 1);
        setRefocusFlag(true);
    }

    // Handler for plan change link on review screen.
    const handleReviewPlanChange = (skipStep?: boolean) => {
        console.log('handleReviewPlanChange', skipStep);
        if (skipStep) setSkipStepFlag(true);
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
        // Only refocus when a navigation button has been selected. This
        // prevents an awkward refocus when typing info into an input that
        // has an error message.
        if (refocusFlag) {
            const nextInput = form.getElementsByTagName('input');
            if (nextInput[0]) nextInput[0].focus();
            if (stepState === 4) {
                const nextAnchor = form.getElementsByTagName('a');
                if (nextAnchor[0]) nextAnchor[0].focus();
            }
        }
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
                                    //console.log('switch statement started', stepState);
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
                                        case 5:
                                            return <FormBodyComplete />
                                        default:
                                            console.log('This was hit somehow');
                                    }
                                }
                                )()
                            }
                            {stepState <= 4 && <FormButtonContainer handlePrev={handlePrev} />}
                        </form>
                    </FormProvider>
                </AnnualContext.Provider>
            </StepContext.Provider>
        </div>
    );
}