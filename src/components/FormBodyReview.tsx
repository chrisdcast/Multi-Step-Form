import { useContext, useEffect } from "react";
import { ReviewListItem, IReviewListItemParams, IListSubItem } from "./lists/ReviewListItem";
import { AnnualContext } from "./FormCard";
import { FakePlanAPI } from "../interfaces/PlanInterfaces";
import "./FormBodyReview.css";
import { FakeAddOnAPI } from "../interfaces/AddOnInterface";

export function FormBodyReview({ plan, addOns, onPlanChange }: { plan: string, addOns: string[], onPlanChange(): void }) {
    const annual = useContext(AnnualContext);
    const planType = FakePlanAPI.getPlan(plan);
    /////////////////////////////////////////////////////////////////////////////
    // calculateTotal: called by totalListItem to get the combined total of
    // plan and all add ons.
    /////////////////////////////////////////////////////////////////////////////
    const calculateTotal = ():number => {
        let runningTotal = 0;
        // Adding base plan price.
        annual ? runningTotal += FakePlanAPI.getPriceAnnual(plan) : runningTotal += FakePlanAPI.getPriceMonthly(plan);
        // Adding individual add on prices.
        for (let ao in addOns){
            annual ? runningTotal+= FakeAddOnAPI.getPriceAnnual(addOns[ao]) : runningTotal+= FakeAddOnAPI.getPriceMonthly(addOns[ao]);
        }
        return runningTotal;
    }

    const addOnList: IListSubItem[] = FakeAddOnAPI.getAddOns(addOns).map((ao) => {
        let addOn: IListSubItem = {
            label: ao.name,
            value: annual ? `+$${FakeAddOnAPI.getPriceAnnual(ao.id)}/yr` : `+$${FakeAddOnAPI.getPriceMonthly(ao.id)}/mo`
        }
        return addOn;
    });

    const addOnListItem: IReviewListItemParams = {
        subItems: addOnList
    };

    const planListItem: IReviewListItemParams = {
        label: `${planType.name} ${annual ? '(Yearly)' : '(Monthly)'}`,
        value: annual ? `$${FakePlanAPI.getPriceAnnual(planType.id)}/yr` : `$${FakePlanAPI.getPriceMonthly(planType.id)}/mo`,
        subscript: 'Change',
        linked: {
            handleClick: () => { onPlanChange() }
        }
    };
    
    const totalListItem: IReviewListItemParams = {
        label: annual ? 'Total (per year)' : 'Total (per month)',
        value: annual ? `+$${calculateTotal()}/yr` : `+$${calculateTotal()}/mo`,
        classNames: ['TotalListItem']
    }

    return (
        <div className="Card FormBody">
            <h1>Finishing up</h1>
            <p>Double-check everything looks OK before continuing.</p>
            <div className="ReviewListSection">
                <div className="ReviewListPlanSection">
                    <ReviewListItem params={planListItem} />
                </div>
                <div className="ReviewListAddOnSection">
                    <ReviewListItem params={addOnListItem} />
                </div>
            </div>
            <div className="ReviewListTotalSection">
                <ReviewListItem params={totalListItem}/>
            </div>
        </div>
    )
}