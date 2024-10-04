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
        description,
        subscript } = params;
    const { register } = useFormContext();

    /////////////////////////////////////////////////////////////////////////////
    // handleCheckbox toggles the data-checked attribute for the currently
    // selected checkbox.  
    /////////////////////////////////////////////////////////////////////////////
    const handleCheckbox = () => {
        const checkbox = document.getElementById(`${label} Checkbox`);
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

    /////////////////////////////////////////////////////////////////////////////
    // Functions of useEffect for CheckboxCard
    // 1) check the checked variable and automatically check the box accordingly.
    /////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const checkbox = document.getElementById(`${label} Checkbox`);
        if (!checkbox) {
            console.log('CheckboxCard:useEffect:checkbox not found');
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
            id={`${label} Checkbox`}
            className={classNames ? `CheckboxCard ${classNames.join('')}` : "CheckboxCard"}
        >
            <label htmlFor={`${label} ${name}`}></label>
            <input
                type="checkbox"
                id={`${label} ${name}`}
                {...register(name, registerParams)}
                value={value}
                onClick={handleCheckbox}
            />
            <div className="CheckboxContent">
                <div className="CheckboxMark">
                    <img />
                </div>
                <div className="CheckboxLabelContainer">
                    <h3>{label}</h3>
                    <p className="Description">{description}</p>
                </div>
                <p className="Subscript">{subscript}</p>
            </div>
        </div>
    )
}