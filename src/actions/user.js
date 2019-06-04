import Axios from "axios";
import { userDomain } from '../constants';
import * as actionTypes from './types';

export const reqSend = () => {
    return {
        type: actionTypes.SENT_REQ
    };
}

export const reqFailed = () => {
    return {
        type: actionTypes.FAILED_REQ
    }
}

export const reqSuccess = () => {
    return {
        type: actionTypes.SUCCESS_REQ
    }
}

export const loginAsync = content => {
    return dispatch => {
        dispatch(reqSend());
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

export const signupAsync = content => {
    return dispatch => {
        dispatch(reqSend());
        return Axios({
            method: "POST",
            url: `${userDomain}/users/register`,
            data: {
                email: content.email,
                name: content.name
            }
        });
    }
}

export const signup = data => {
    return {
        type: actionTypes.SIGNUP,
        payload: data
    }
}