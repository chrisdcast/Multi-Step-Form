import './ReviewListItem.css';

export interface IReviewListItemParams {
    label: string;
    value: string;
    classNames?: string[];
    subscript?: string;
    linked?: {
        url?: string;
        handleClick?(): void;
    };
}

export function ReviewListItem({ params }: { params: IReviewListItemParams }) {
    const {
        label,
        value,
        classNames,
        subscript,
        linked
    } = params;

    if (linked) {
        return (
            <li className={classNames ? `ReviewListItem ${classNames.join('')}` : "ReviewListItem"}>
                <div className="LabelContainer">
                    <h3>{label}</h3>
                    <a href={linked.url} className="Subscript" onMouseDown={linked.handleClick}>{subscript}</a>
                </div>
                <div className="ValueContainer">
                    <p className="value">{value}</p>
                </div>
            </li>
        )
    } else {
        return (
            <li className={classNames ? `ReviewListItem ${classNames.join('')}` : "ReviewListItem"}>
                <div className="LabelContainer">
                    <h3>{label}</h3>
                    <p className="Subscript">{subscript}</p>
                </div>
                <div className="ValueContainer">
                    <p className="value">{value}</p>
                </div>
            </li>
        )
    }
}