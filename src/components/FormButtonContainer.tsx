import './FormButtonContainer.css';
import './forms/Button.css';
import { useContext } from 'react';
import { StepContext } from './FormCard';
import { IFormButtonParams, FormButton } from './forms/FormButton';

export default function FormButtonContainer({ handlePrev }: { handlePrev(): void }) {
    const step = useContext(StepContext);
    const prevButtonParams: IFormButtonParams = {
        id: 'Prev',
        type: 'button',
        text: 'Go Back',
        classNames: ['PrevStep'],
        display: step !== 1 ? true : false,
        handleClick: handlePrev
    };
    const nextButtonParams: IFormButtonParams = {
        id: 'Next',
        type: 'submit',
        text: step === 4 ? 'Confirm' : 'Next Step',
        classNames: ['NextStep']
    };

    return (
        <div className='FormButtonContainer'>
            <FormButton params={prevButtonParams} />
            <FormButton params={nextButtonParams} />
        </div>
    )
}