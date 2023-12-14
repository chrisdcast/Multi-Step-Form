import "./InputText.css";
import { useFormContext } from "react-hook-form";

export interface InputTextParams {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  errorText?: string
}

export function InputText({ params }: { params: InputTextParams }) {
  const {
    name,
    type,
    label,
    placeholder,
    required,
    errorText } = params;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (name in errors) {
    console.log(errors);
  }

  return (
    <div className="InputText">
      <div className="LabelContainer">
        <label htmlFor={name}>{label}</label>
        <p>
          {name in errors && <span role="alert">{errorText}</span>}
        </p>
      </div>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={name in errors ? "true" : "false"}
        {...register(name, { required: required })}
      />
    </div>
  );
}
