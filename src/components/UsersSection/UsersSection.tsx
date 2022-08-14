import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { IUser } from "../../models";

import FormSection from "../FormSection/FormSection";
import Users from "../Users/Users";

export interface SomeInterface {
    change: boolean;
}
const UsersSection = () => {
    /**
     * Handle page change
     */
    const [page, setPage] = useState<number>(1);
    const changePage = () => setPage(prev => ++prev);

    /**
     * Get users
     */
    const [data, setData] = useState<IUser[]>([]);

    const getUsers = useCallback(async (selectedPage: number) => {
        try {
            const response = await axios.get(
                `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${selectedPage}&count=6`
            );
            setData(response.data.users);
        } catch (e: unknown) {
            const error = e as AxiosError;
            throw error;
        }
    }, []);

    useEffect(() => {
        getUsers(page);
    }, [page, getUsers]);

    const sendUser = async (formData: FormData) => {
        try {
            const getToken = await axios.get(
                "https://frontend-test-assignment-api.abz.agency/api/v1/token"
            );

            return await axios
                .post(
                    "https://frontend-test-assignment-api.abz.agency/api/v1/users",
                    formData,
                    { headers: { Token: getToken.data.token } }
                )
                .then(response => {
                    if (response.data.success) {
                        getUsers(1);
                    }
                });
        } catch (e: unknown) {
            const error = e as AxiosError;
            throw error;
        }
    };

    return (
        <>
            <Users data={data} changePage={changePage} />
            <FormSection sendUser={sendUser} />
        </>
    );
};

export default UsersSection;
