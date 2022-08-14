import { FC } from "react";

import { UserProps } from "./interfaces";

import "./User.scss";

const User: FC<UserProps> = ({
    user: { photo, name, position, email, phone },
}) => (
    <div className="user">
        <img className="user-img" src={photo} alt={name} />

        <p>{name}</p>

        <div className="user-text-wrapper">
            <p>{position}</p>
            <p>{email}</p>
            <p>{phone}</p>
        </div>
    </div>
);

export default User;
