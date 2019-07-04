import Axios from 'axios';
import * as actionTypes from './types';
import { userDomain, domain } from '../constants';


const vote = content => Axios.post(`${userDomain}/users/vote`, {
  email: localStorage.getItem('user'),
  cardId: content
});

const voteUp = content => Axios.post(`${domain}/card/add-vote`, {
  cardId: content
});

const voteDown = content => Axios.post(`${domain}/card/remove-vote`, {
  cardId: content
});


export const likeAsync = content => () => Promise.all([vote(content), voteUp(content)])
  .then(([acct, perms]) => {
    console.log(acct);
  });

export const unlikeAsync = content => () => Promise.all([vote(content), voteDown(content)])
  .then(([acct, perms]) => {
    console.log(acct);
  });

export const incrementVotes = cardId => ({
  type: actionTypes.INCREMENT_VOTES,
  payload: cardId
});

export const decrementVotes = cardId => ({
  type: actionTypes.DECREMENT_VOTES,
  payload: cardId
});
