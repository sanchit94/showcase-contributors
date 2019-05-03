import Axios from "axios";
import { userDomain } from '../constants';
import * as actionTypes from './types';

export const loginAsync = content => {
    return () => {
        return Axios({
            method: "POST",
            url: `${userDomain}/users/login/cont`,
            data: {
                email: content
            }
        });
    }
}

export const login = data => {
    return {
        type: actionTypes.LOGIN,
        payload: data
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}