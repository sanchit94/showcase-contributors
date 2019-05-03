import axios from 'axios';
import { domain } from './constants';

import _ from 'underscore';

export const loadStore = getCurrentState => {
  return new Promise(resolve => {
    axios(`${domain}/state`)
    .then(res => {
      //Here we have to change the structure of response data to align with our redux state structure.
      let data = res.data;
      // Performing some reduce operations to change the structure of data[boards].
      const baardRed = data.boards.reduce((acc, board) => {
        acc[board.id] = {
          boardId: board.id,
          editing: false,
          listIds: board.listIds,
          name: board.name
        }
        return acc;
      }, {});
      const boardIds = data.boards.reduce((acc, board) => board.id, []);
      // data[baords] needs to be an object with keys boards and boardIds, for it to match our state structure.
      data.boards = {
        boards: baardRed,
        boardIds: boardIds
      };
      data.lists = _.indexBy(data.lists, 'id');
      data.loading = false;
      data.isLoggedIn = !!(localStorage.getItem('user'));
      // data.user = localStorage.getItem('user') && "";
      console.log(data)
      return data;
    })
      .then(data => {
        resolve({
          ...getCurrentState(),
          boards: data.boards,
          lists: data.lists,
          cards: data.cards,
          loading: data.loading,
          isLoggedIn: data.isLoggedIn
        });
      });
  });
}