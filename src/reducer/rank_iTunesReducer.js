export const rank_iTunesReducer = (state={isFetching:true,fetched:false,error:false,fetchData:null},action)=>{
    switch(action.type){
        case 'rank_iTunes_Fetch_PENDING':
            state = {...state,isFetching:true};
            break;
        case 'rank_iTunes_Fetch_FULFILLED':
            state = {...state,isFetching:false,fetched:true,error:false,fetchData:action.payload};
            break;
        case 'rank_iTunes_Fetch_REJECTED':
            state = {...state,isFetching:false,fetched:false,error:true};
            break;
        default:
            break
    }
    return state;
}