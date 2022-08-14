import { FC } from "react";

import { UsersProps } from "./interfaces";

import Button from "../Button/Button";
import User from "../User/User";

import "./Users.scss";

const Users: FC<UsersProps> = ({ data, changePage }) => (
    <section className="users" id="users">
        <div className="container">
            <div className="users-wrapper">
                <h2 className="title">Working with GET request</h2>

                <div className="users-inner-wrapper">
                    {data.map(user => (
                        <User key={user.id} user={user} />
                    ))}
                </div>

                <Button center text="Show more" showMore={changePage} />
            </div>
        </div>
    </section>
);

export default Users;
