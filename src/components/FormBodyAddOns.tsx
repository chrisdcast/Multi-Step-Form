import { CheckboxCard, ICheckboxCard } from "./forms/CheckboxCard"
import { ActiveAddOns } from "../interfaces/AddOnInterface"

export default function FormBodyAddOns() {
    const activeAddOns = ActiveAddOns;
    const checkboxCardParams: ICheckboxCard = {
        name: activeAddOns[0].name,
        label: activeAddOns[0].name,
        value: activeAddOns[0].id,
    }

    return (
        <div className="Card FormBody">
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experience</p>
            <CheckboxCard params={checkboxCardParams} />
        </div>
    )
}