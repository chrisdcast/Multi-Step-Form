import './Toggle.css';
import { useFormContext } from "react-hook-form";
import { useEffect } from 'react';

const DATA_CHECKED_LIT = 'data-checked';

export interface IToggleParams {
    name: string;
    labelLeft?: string;
    labelRight?: string;
    classNames?: string[];
    checked?: boolean;
    registerParams?: {
        required?: boolean;
        disabled?: boolean;
        onChange?(): void;
    }
}

export function Toggle({ params }: { params: IToggleParams }) {
    const {
        name,
        labelLeft,
        labelRight,
        classNames,
        checked,
        registerParams } = params;
    const { register } = useFormContext();

    const handleToggle = () => {
        //console.log('handleToggle hit');
        const toggleFrame = document.getElementById(`${name} Toggle`);
        if (!toggleFrame) {
            console.log('Toggle:handleToggle:toggleFrame not found');
            return;
        }
        const checked = toggleFrame.getAttribute(DATA_CHECKED_LIT);
        if (checked === 'false') {
            toggleFrame.setAttribute(DATA_CHECKED_LIT, 'true');
        } else {
            toggleFrame.setAttribute(DATA_CHECKED_LIT, 'false');
        }
    }

    useEffect(() => {
        //console.log('useEffect for Toggle');
        const toggleFrame = document.getElementById(`${name} Toggle`);
        if (!toggleFrame) {
            console.log('Toggle:useEffect:toggleFrame not found');
            return;
        }
        if (checked) {
            toggleFrame.setAttribute(DATA_CHECKED_LIT, 'true');
        } else {
            toggleFrame.setAttribute(DATA_CHECKED_LIT, 'false');
        }
    })

    return (
        <div
            id={`${name} Toggle`}
            className={classNames ? `Toggle ${classNames.join('')}` : "Toggle"}
        >
            <p className={'LabelLeft'}>{labelLeft}</p>
            <div className="ToggleFrame" data-checked="false">
                <label htmlFor={name} ></label>
                <input
                    id={name}
                    type="checkbox" {...register(name, registerParams)}
                value="true"
                    onClick={handleToggle}
                />
                <div className="ToggleDot"></div>
            </div>
            <p className={'LabelRight'}>{labelRight}</p>
        </div>
    )
}