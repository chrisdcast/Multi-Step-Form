import { IRadioButtonCardParams } from "./RadioButtonCard";
import { RadioButtonCard } from "./RadioButtonCard";
import { v4 as uuidv4 } from 'uuid';
import './RadioCardContainer.css';

export interface IRadioButtonCardContainerParams {
    name: string;
    cards: IRadioButtonCardParams[];
    classNames?: string[];
}

export function RadioCardContainer({ params }: { params: IRadioButtonCardContainerParams }) {
    const { classNames, cards, name } = params;
    const containerId = uuidv4();

    return (
        <div className={classNames ? `RadioCardContainer ${classNames?.join(' ')}` : 'RadioCardContainer'}>
            {
                cards.map((card, i) => (
                    <RadioButtonCard
                        params={card}
                        name={name}
                        key={`${containerId}/${i}`}
                        containerId={containerId}
                    />
                ))
            }
        </div>
    )
}