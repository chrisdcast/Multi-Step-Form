import { useFormContext } from "react-hook-form";

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

    return (
        <div
            id={`${name} Checkbox`}
            className={classNames ? `Toggle ${classNames.join('')}` : "Toggle"}>
            <label htmlFor={name}></label>
            <input
                type="checkbox"
                id={name}
                {...register(name, registerParams)}
                value={value} />
        </div>
    )
}