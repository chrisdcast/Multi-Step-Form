import { CheckboxCard } from "./forms/CheckboxCard"
import { ActiveAddOns, FakeAddOnAPI } from "../interfaces/AddOnInterface"
import { AnnualContext } from "./FormCard";
import { useContext } from "react";

export default function FormBodyAddOns({ currentAddOns }: { currentAddOns: string[] }) {
    const annual = useContext(AnnualContext);
    const activeAddOns = ActiveAddOns;

    return (
        <div className="Card FormBody">
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experience</p>
            {
                activeAddOns.map((el, i) => (
                    <CheckboxCard params={{
                        name: 'addOns',
                        label: el.name,
                        value: el.id,
                        description: el.description,
                        subscript: annual ? `+$${FakeAddOnAPI.getPriceAnnual(el.id)}/yr` : `+$${FakeAddOnAPI.getPriceMonthly(el.id)}/mo`,
                        checked: currentAddOns.includes(el.id) ? true : false
                    }} key={`CheckboxCard ${i}`} />
                ))}
        </div>
    )
}