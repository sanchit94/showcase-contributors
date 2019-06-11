import Axios from "axios";
import * as actionTypes from "./types";
import { userDomain, domain } from "../constants";


const vote = content => {
    return Axios.post(`${userDomain}/users/vote`, {
        email: localStorage.getItem('user'),
        cardId: content
    });
}

const voteUp = content => {
    return Axios.post(`${domain}/card/add-vote`, {
        cardId: content
    });
}

const voteDown = content => {
    return Axios.post(`${domain}/card/remove-vote`, {
        cardId: content
    });
}



export const likeAsync = content => {
    return () => {
        return Promise.all([vote(content), voteUp(content)])
        .then(function([acct, perms]) {
            console.log(acct);
        });
    }
}

export const unlikeAsync = content => {
    return () => {
        return Promise.all([vote(content), voteDown(content)])
        .then(function([acct, perms]) {
            console.log(acct);
        });
    }
}

export const incrementVotes = cardId => {
    return {
        type: actionTypes.INCREMENT_VOTES,
        payload: cardId
    }
}

export const decrementVotes = cardId => {
    return {
        type: actionTypes.DECREMENT_VOTES,
        payload: cardId
    }
}