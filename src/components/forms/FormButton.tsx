import "./Button.css";

export interface IFormButtonParams {
  id?: string;
  type?: string;
  text?: string;
  classNames?: string[];
  display?: boolean;
  disable?: boolean;
  handleClick?(): void;
}

export function FormButton({ params }: { params: IFormButtonParams }) {
  const { type, text, classNames, display, disable, id, handleClick } = params;

  return (
    <div className={`Button ${classNames?.join(' ')}`}>
      <input
        id={id}
        type={type}
        value={text}
        data-disable={disable}
        data-display={display}
        onClick={handleClick} />
    </div>
  );
}
