export const radioCategoriesRCMReducer = (
  state = { isFetching: true, fetched: false, error: false, fetchData: null },
  action
) => {
  switch (action.type) {
    case "radioCategoriesRCM_Fetch_PENDING":
      state = { ...state, isFetching: true, fetched: false, error: false };
      break;
    case "radioCategoriesRCM_Fetch_FULFILLED":
      state = {
        ...state,
        isFetching: false,
        fetched: true,
        error: false,
        fetchData: action.payload
      };
      break;
    case "radioCategoriesRCM_Fetch_REJECTED":
      state = { ...state, isFetching: false, fetched: true, error: true };
      break;
    default:{
      
    }
  }
  return state;
};

export const radioCategoriesProgramReducer = (
  state = { isFetching: true, fetched: false, error: false, fetchData: null },
  action
) => {
  switch (action.type) {
    case "radioCategoriesProgram_Fetch_PENDING":
      state = { ...state, isFetching: true, fetched: false, error: false };
      break;
    case "radioCategoriesProgram_Fetch_FULFILLED":
      state = {
        ...state,
        isFetching: false,
        fetched: true,
        error: false,
        fetchData: action.payload
      };
      break;
    case "radioCategoriesProgram_Fetch_REJECTED":
      state = { ...state, isFetching: false, fetched: true, error: true };
      break;
    default:{
    }
  }
  return state;
};
