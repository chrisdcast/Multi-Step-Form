import { useContext } from "react";
import { ReviewListItem, IReviewListItemParams } from "./lists/ReviewListItem";
import { AnnualContext } from "./FormCard";
import { FakePlanAPI } from "../interfaces/PlanInterfaces";
import "./FormBodyReview.css";

export function FormBodyReview({ plan, onPlanChange }: { plan: string, onPlanChange(): void }) {
    const annual = useContext(AnnualContext);
    const planType = FakePlanAPI.getPlan(plan);
    const planListItem: IReviewListItemParams = {
        label: `${planType.name} ${annual ? '(Yearly)' : '(Monthly)'}`,
        value: annual ? `$${FakePlanAPI.getPriceAnnual(planType.id)}/yr` : `$${FakePlanAPI.getPriceMonthly(planType.id)}/mo`,
        subscript: 'Change',
        linked: {
            handleClick: () => {onPlanChange()}
        }
    };

    return (
        <div className="Card FormBody">
            <h1>Finishing up</h1>
            <p>Double-check everything looks OK before continuing.</p>
            <div className="ReviewListBlock">
                <div className="ReviewListPlanSection">
                    <ReviewListItem params={planListItem}/>
                </div>
            </div>
        </div>
    )
}