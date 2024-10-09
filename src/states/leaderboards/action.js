import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderBoardsActionCreator(leaderBoards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderBoards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.getLeaderboards();
      const leaderboards = response;
      dispatch(receiveLeaderBoardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderBoardsActionCreator,
  asyncReceiveLeaderboards,
};
