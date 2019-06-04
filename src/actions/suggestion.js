import Axios from "axios";

import { reqSend } from './user'
import { domain } from '../constants';

export const suggest = content => {
    return dispatch => {
        dispatch(reqSend());
        return Axios({
            method: "POST",
            url: `${domain}/suggest`,
            data: {
                usermail: localStorage.getItem('user') || "Anonymous",
                name: localStorage.getItem('username') || "Anonymous",
                suggestion: content
            }
        });
    }
}