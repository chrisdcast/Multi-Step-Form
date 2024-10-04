import './StepContainer.css';
import { IStepParams } from './Step';
import Step from './Step';
import { useContext } from 'react';
import { StepContext } from './FormCard';

export default function StepContainer({ stepInfo }: { stepInfo: IStepParams[] }) {
    const currentStep = useContext(StepContext);
    let highlightStepNum = 0;
    //////////////////////////////////////////////
    // Determine which step is the current step. If the current card displayed
    // is beyond the number of steps defined then default to the last step
    // number.
    //////////////////////////////////////////////
    highlightStepNum = currentStep;
    if (highlightStepNum > stepInfo.length) highlightStepNum = stepInfo.length;
    return (
        <div className="StepContainer">
            {stepInfo.map((el, i) => (
                <Step
                    stepNum={i + 1}
                    isCurrentStep={highlightStepNum === i + 1 ? true : false}
                    params={el}
                    key={`Step ${i}`} />
            ))}
        </div>
    )
}