import './FormCard';
import './Step.css';
import { useContext } from 'react';
import { StepContext } from './FormCard';

export interface IStepParams {
    label: string;
    text: string;
}
export default function Step({ stepNum, params }: { stepNum: number, params: IStepParams }) {
    const step = useContext(StepContext);
    const { label, text } = params;

    return (
        <div className="Step">
            <div className="StepDot" data-current-step={stepNum === step}>{stepNum}</div>
            <div className="StepLabel">
                <h1>{label.toUpperCase()}</h1>
                <p>{text.toUpperCase()}</p>
            </div>
        </div>
    )
}