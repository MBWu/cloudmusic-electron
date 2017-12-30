export const radioDetailInfoReducer = (
  state = { isFetching: true, fetched: false, error: false, fetchData: null },
  action
) => {
  switch (action.type) {
    case "radioDetailInfo_Fetch_PENDING":
      state = { ...state, isFetching: true, error: false, fetched: false };
      break;
    case "radioDetailInfo_Fetch_FULFILLED":
      state = {
        ...state,
        isFetching: false,
        error: false,
        fetched: true,
        fetchData: action.payload
      };
      break;
    case "radioDetailInfo_Fetch_REJECTED":
      state = { ...state, isFetching: false, error: true, fetched: true };
      break;
    default:{
      
    }
  }
  return state;
};

export default radioDetailInfoReducer;