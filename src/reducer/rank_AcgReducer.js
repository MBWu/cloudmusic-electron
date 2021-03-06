export const rank_AcgReducer = (state={isFetching:true,fetched:false,error:false,fetchData:null},action)=>{
    switch(action.type){
        case 'rank_Acg_Fetch_PENDING':
            state = {...state,isFetching:true};
            break;
        case 'rank_Acg_Fetch_FULFILLED':
            state = {...state,isFetching:false,fetched:true,error:false,fetchData:action.payload};
            break;
        case 'rank_Acg_Fetch_REJECTED':
            state = {...state,isFetching:false,fetched:false,error:true};
            break;
        default:
            break
    }
    return state;
}