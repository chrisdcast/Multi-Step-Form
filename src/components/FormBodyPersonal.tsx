import './Card.css';
import './FormBody.css';
import { InputText, InputTextParams } from './forms/InputText';

export default function FormBodyPersonal() {
    const nameInput: InputTextParams = {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'e.g. Stephen King',
        required: true,
        errorText: 'This field is required'
    };

    const emailInput: InputTextParams = {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
        required: true,
        errorText: 'This field is required'
    };

    const phoneInput: InputTextParams = {
        name: 'phone',
        type: 'tel',
        label: 'Phone Number',
        placeholder: 'e.g. +1 234 567 890',
        required: true,
        errorText: 'This field is required'
    };

    return (
        <div className="Card FormBody">
            <h1>Personal info</h1>
            <p>Please provide your name, email address, and phone number.</p>
            <InputText params={nameInput} />
            <InputText params={emailInput} />
            <InputText params={phoneInput} />
        </div>
    )
}