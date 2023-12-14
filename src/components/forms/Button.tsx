import "./Button.css";
import { Link } from "react-router-dom";

export default function Button({
  text,
  linkTo,
}: {
  text: string;
  linkTo?: string;
}) {
  return (
    <div className="Button">
      {linkTo ? (
        <Link className="Link" to={linkTo}>
          {text}
        </Link>
      ) : (
        <button>{text}</button>
      )}
    </div>
  );
}
