import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import './CheckboxCard.css';

const DATA_CHECKED_LIT = 'data-checked';

export interface ICheckboxCard {
    name: string;
    label: string;
    value: string;
    classNames?: string[];
    checked?: boolean;
    registerParams?: {
        required?: boolean;
        disabled?: boolean;
        onChange?(): void;
    };
    imgUrl?: string;
    description?: string;
    subscript?: string;
}

export function CheckboxCard({ params }: { params: ICheckboxCard }) {
    const {
        name,
        label,
        value,
        classNames,
        checked,
        registerParams,
        imgUrl,
        description,
        subscript } = params;
    const { register } = useFormContext();

    /////////////////////////////////////////////////////////////////////////////
    // handleCheckbox toggles the data-checked attribute for the currently
    // selected checkbox.  
    /////////////////////////////////////////////////////////////////////////////
    const handleCheckbox = () => {
        const checkbox = document.getElementById(`${name} Checkbox`);
        if (!checkbox) {
            console.log('CheckboxCard:handleCheckbox:checkbox not found');
            return;
        }
        if (checkbox.getAttribute('data-checked') === 'true') {
            checkbox.setAttribute(DATA_CHECKED_LIT, 'false');
        } else {
            checkbox.setAttribute(DATA_CHECKED_LIT, 'true');
        }
    }

    useEffect(() => {
        const checkbox = document.getElementById(`${name} Checkbox`);
        if (!checkbox) {
            console.log('CheckboxCard:handleCheckbox:checkbox not found');
            return;
        }
        if (checked) {
            checkbox.setAttribute(DATA_CHECKED_LIT, 'true');
        } else {
            checkbox.setAttribute(DATA_CHECKED_LIT, 'false');
        }
    })

    return (
        <div
            id={`${name} Checkbox`}
            className={classNames ? `CheckboxCard ${classNames.join('')}` : "CheckboxCard"}
            onMouseDown={handleCheckbox}>
            <label htmlFor={name}></label>
            <input
                type="checkbox"
                id={name}
                {...register(name, registerParams)}
                value={value} />
            <div className="CheckboxMark">
                <img />
            </div>
            <div className="CheckboxLabelContainer">
                <h1>{label}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}