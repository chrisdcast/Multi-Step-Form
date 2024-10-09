import './ReviewListItem.css';

export interface IListSubItem {
    label: string;
    value?: string;
    classNames?: string[];
}

export interface IReviewListItemParams {
    label?: string;
    value?: string;
    classNames?: string[];
    subscript?: string;
    linked?: {
        url?: string;
        handleClick?(skipStep?: boolean): void;
    };
    subItems?: IListSubItem[];
}

export function ReviewListItem({ params }: { params: IReviewListItemParams }) {
    const {
        label,
        value,
        classNames,
        subscript,
        linked,
        subItems
    } = params;

    if (linked) {
        return (
            <>
                {label &&
                    <li key={`Review List Title ${label}`}
                        className={classNames ? `ReviewListItem ${classNames.join('')}` : "ReviewListItem"}>
                        <div className="LabelContainer">
                            <h3>{label}</h3>
                            <a
                                href={linked.url}
                                className="Subscript"
                                onMouseDown={() => {
                                    if (linked.handleClick) linked.handleClick();
                                }}
                                onKeyDown={(e) => {
                                    if (!linked.handleClick) return;
                                    if (e.key === "Enter") linked.handleClick(true);
                                    if (e.key === ' ') linked.handleClick();
                                }}
                                tabIndex={0}>{subscript}</a>
                        </div>
                        <div className="ValueContainer">
                            <p className="value">{value}</p>
                        </div>
                    </li>
                }
                {subItems?.map((item) => {
                    return (
                        <li key={`List Item ${item.label}`}>
                            <div className={classNames ? `ReviewListSubItem ${classNames.join('')}` : "ReviewListSubItem"}>
                                <p className="SubItemLabel">{item.label}</p>
                                <p className="SubItemValue">{item.value}</p>
                            </div>
                        </li>
                    )
                })}
            </>
        )
    } else {
        return (
            <>
                {label &&
                    <li className={classNames ? `ReviewListItem ${classNames.join('')}` : "ReviewListItem"}>
                        <div className="LabelContainer">
                            <h3>{label}</h3>
                            <p className="Subscript">{subscript}</p>
                        </div>
                        <div className="ValueContainer">
                            <p className="value">{value}</p>
                        </div>
                    </li>
                }
                {subItems?.map((item) => {
                    return (
                        <li>
                            <div className={classNames ? `ReviewListSubItem ${classNames.join('')}` : "ReviewListSubItem"}>
                                <p className="SubItemLabel">{item.label}</p>
                                <p className="SubItemValue">{item.value}</p>
                            </div>
                        </li>
                    )
                })}
            </>
        )
    }
}