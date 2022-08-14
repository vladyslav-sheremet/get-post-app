import { IUser } from "../../models";

export interface UsersProps {
    /**
     * Data to render
     */
    data: IUser[];
    /**
     * Change page handler function
     */
    changePage: () => void;
}
