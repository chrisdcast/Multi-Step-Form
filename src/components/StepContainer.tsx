import './StepContainer.css';
import { IStepParams } from './Step';
import Step from './Step';

export default function StepContainer({ stepInfo }: { stepInfo: IStepParams[] }) {
    return (
        <div className="StepContainer">
            {stepInfo.map((el, i) => (
                <Step stepNum={i + 1} params={el} key={`Step ${i}`} />
            ))}
        </div>
    )
}