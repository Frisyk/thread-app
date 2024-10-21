import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.UPVOTE_THREAD:
      if (threadDetail && threadDetail.id === action.payload.threadId) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
            ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
            : threadDetail.upVotesBy.concat([action.payload.userId]),

          downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
            ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
            : threadDetail.downVotesBy,
        };
      }
      return threadDetail;

    case ActionType.DOWNVOTE_THREAD:
      if (threadDetail.id === action.payload.threadId) {
        return {
          ...threadDetail,
          downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
            ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
            : threadDetail.downVotesBy.concat([action.payload.userId]),

          upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
            ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
            : threadDetail.upVotesBy,
        };
      }
      return threadDetail;

    case ActionType.NEUTRALIZE_VOTE_THREAD:
      if (threadDetail.id === action.payload.threadId) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }
      return threadDetail;

    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };

    case ActionType.UPVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat([action.payload.userId]),

              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };

    case ActionType.DOWNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                : comment.downVotesBy.concat([action.payload.userId]),

              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
            };
          }
          return comment;
        }),
      };

    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return comment;
        }),
      };

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
