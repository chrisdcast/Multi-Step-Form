import './FormBodyComplete.css';
import imgUrl from '../assets/icon-thank-you.svg';

export function FormBodyComplete() {
    return (
        <div className="Card FormBody FormBodyComplete">
            <div className="ImgContainerCheck">
                <img src={imgUrl} alt="checkmark" />
            </div>
            <h1>Thank you!</h1>
            <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com</p>
        </div>
    );
}