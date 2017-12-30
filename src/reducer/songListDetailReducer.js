export const songListDetailReducer = (state={isFetching:true,fetched:false,error:false,data:null}, action) => {
  switch (action.type) {
    case 'songListDetail_add':
        state = {...state,data:action.payload}
        break;
    case 'songListDetail_Fetch_PENDING':
        state={...state,isFetching:true,fetched:false,error:false,data:null}
        break;
    case 'songListDetail_Fetch_FULFILLED':
        state={...state,isFetching:false,fetched:true,error:false,data:action.payload}
        break;
    case 'songListDetail_Fetch_REJECTED':
        state={...state,isFetching:false,fetched:false,error:true}
        break;
    case 'songListDetail_Recover':
        state={isFetching:true,fetched:false,error:false,data:{}}
        break;
    default:{
    }
  }
  return state;
};
