import { useState, createContext } from "react";
import { useForm, FormProvider, SubmitHandler, set } from "react-hook-form";
import { IRegisterFormInfo } from "../interfaces/FormInterfaces";
import { IStepParams } from "./Step";
import StepContainer from "./StepContainer";
import FormBodyPersonal from './FormBodyPersonal';
import FormBodyPlan from './FormBodyPlan';
import FormBodyAddOns from "./FormBodyAddOns";
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
    const methods = useForm<IRegisterFormInfo>({ defaultValues: { plan: 'ARC' } });
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
        console.log('submit handler hit');
        setFormInfo({ ...formInfoState, ...data });
        setStepState(stepState + 1);
    }
    // Handler for Go Back button
    const handlePrev = () => {
        console.log('prev step handler hit');
        //nextBtn = false;
        if (stepState > 1) setStepState(stepState - 1);
    }
    // onChange event handler for plan radio card buttons.
    const radioPlanChange = (value: string) => {
        console.log('radio card changed', value);
        if (!value) return;
        setFormInfo({ ...formInfoState, plan: value });
        // setFormInfo({ ...formInfoState, plan: value });
    }
    // onChange event for toggle to rerender the screen.
    const toggleChange = () => {
        if (formInfoState.annual === 'true') {
            setFormInfo({ ...formInfoState, annual: '' })
        } else {
            setFormInfo({ ...formInfoState, annual: 'true' })
        }
    }

    console.log(formInfoState);

    return (
        <div className="Card FormCard">
            <StepContext.Provider value={stepState}>
                <StepContainer stepInfo={stepLiterals} />
                <AnnualContext.Provider value={formInfoState.annual}>
                    <FormProvider {...methods}>
                        <form className="FormContainer" onSubmit={methods.handleSubmit(formSubmit)}>
                            {
                                (() => {
                                    console.log('switch statement started', stepState);
                                    switch (stepState) {
                                        case 1:
                                            console.log('case 1 hit');
                                            return <FormBodyPersonal />

                                        case 2:
                                            console.log('case 2 hit');
                                            return <FormBodyPlan
                                                planChange={radioPlanChange}
                                                toggleChange={toggleChange}
                                                planType={formInfoState.plan}
                                            />

                                        case 3:
                                            console.log('case 3 hit');
                                            return <FormBodyAddOns currentAddOns={formInfoState.addOns} />

                                        case 4:
                                            console.log('case 4 hit');
                                            return <p>4th form</p>

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