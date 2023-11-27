import axios from "axios";
import { getall } from "app/Slices/users.slice";
import { Dispatch } from "redux";


export const getAllUsers = () => (dispatch: Dispatch) => {
    axios.get("/users/getall").then(({ data }) => {
        dispatch(getall(data))
    }).catch(err => dispatch(getall([])))
}
