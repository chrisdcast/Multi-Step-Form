import './FormCard';
import './Step.css';

export interface IStepParams {
    label: string;
    text: string;
}
export default function Step({ stepNum, isCurrentStep, params }: { stepNum: number, isCurrentStep?: boolean, params: IStepParams }) {
    const { label, text } = params;
    
    return (
        <div className="Step">
            <div className="StepDot" data-current-step={isCurrentStep}>{stepNum}</div>
            <div className="StepLabel">
                <h2>{label.toUpperCase()}</h2>
                <p>{text.toUpperCase()}</p>
            </div>
        </div>
    )
}