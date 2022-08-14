import { FC } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

import { ButtonProps } from "./interfaces";

import "./Button.scss";

const Button: FC<ButtonProps> = ({
    text,
    href,
    showMore,
    typeSubmit,
    center,
    disable,
}) => {

    if (href) {
        return (
            <AnchorLink className="link" href={href}>
                {text}
            </AnchorLink>
        )
    }

    if (showMore) {
        return (
            <button
                className={`button${center ? " center" : ""}`}
                onClick={showMore}
            >
                {text}
            </button>
        )
    }
    // {href ? (
    //     <AnchorLink className="link" href={href}>
    //         {text}
    //     </AnchorLink>
    // ) : showMore ? (
    //     <button
    //         className={`button${center ? " center" : ""}`}
    //         onClick={showMore}
    //     >
    //         {text}
    //     </button>
    // ) : (
    //     <button
    //         type={typeSubmit ? "submit" : "button"}
    //         className={`button${center ? " center" : ""}`}
    //         disabled={disable}
    //     >
    //         {text}
    //     </button>
    // )}
    return (
        <button
            type={typeSubmit ? "submit" : "button"}
            className={`button${center ? " center" : ""}`}
            disabled={disable}
        >
            {text}
        </button>
    )
};

export default Button;
