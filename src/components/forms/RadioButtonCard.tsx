import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import './RadioButtonCard.css';

const DATA_CHECKED_LIT = 'data-checked';

export interface IRadioButtonCardParams {
    id: string;
    label: string;
    value: string;
    checked?: boolean;
    imgUrl?: string;
    description?: string;
    subscript?: string;
}

export function RadioButtonCard({ params, name, containerId }: { params: IRadioButtonCardParams, name: string, containerId: string }) {
    const { 
        id, 
        label, 
        value, 
        checked, 
        imgUrl, 
        description, 
        subscript } = params;
    const { register } = useFormContext();

    /////////////////////////////////////////////////////////////////////////////
    // handleRadio will set the 'data-checked' attribute of the selected card 
    // element to true and set the the other cards in the card container to false. 
    /////////////////////////////////////////////////////////////////////////////
    const handleRadio = () => {
        const button = document.getElementById(id);
        const cards = document.getElementsByClassName(containerId);
        if (!button || !cards) {
            if (!button) console.log('RadioButtonCard:handleRadio:button not found');
            if (!cards) console.log('RadioButtonCard:handleRadio:cards not found');     
            return;
        }
        // This loop is to run through the cards in the current RadioCardContainer
        // and set the currently selected element 'data-checked' attribute to true
        // and the others to false.
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] !== button.parentElement) {
                // Unselecting every other element.
                cards[i].setAttribute(DATA_CHECKED_LIT, 'false');
            } else {
                // Selecting the checked card for styling purposes.
                cards[i].setAttribute(DATA_CHECKED_LIT, 'true');
            }
        }
    }

    /////////////////////////////////////////////////////////////////////////////
    // Functions of useEffect for RadioButtonCard
    // 1) check the checked variable and automatically select the button accordingly.
    /////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        console.log('useEffect for card ', id);
        const button = document.getElementById(id);
        if (!button) {
            console.log('RadioButtonCard:useEffect:button not found');
            return;
        }
        if (checked === true) {
            button.parentElement?.setAttribute(DATA_CHECKED_LIT, 'true');
        } else {
            button.parentElement?.setAttribute(DATA_CHECKED_LIT, 'false');
        }
    })

    return (
        <div className={`RadioButtonCard ${containerId}`} onClick={handleRadio} >
            <label htmlFor={id} onClick={handleRadio}></label>
            <input
                type="radio"
                id={id}
                value={value}
                {...register(name, { required: true })}
            />
            {imgUrl &&
                <div className="RadioCardImgContainer">
                    <img
                        alt={`${label} Image`}
                        style={{
                            content: 'url(' + imgUrl + ')',
                            objectFit: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }} />
                </div>
            }
            <div className="RadioCardTextContainer">
                <h1>{label}</h1>
                {description && <p className="Description">{description}</p>}
                {subscript && <p className="Subscript">{subscript}</p>}
            </div>
        </div>
    )
}