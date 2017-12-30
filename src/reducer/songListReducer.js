export const songlistReducer = (state={fetchData:{},isFetching:false,fetched:false,error:false,isUploading:false,uploaded:false,uploadError:false},action)=>{
    switch(action.type){
        case 'songList_Fetch_PENDING':
            state ={...state,isFetching:true,fetched:false,error:false};
            break;
        case 'songList_Fetch_FULFILLED':
            state = {...state,isFetching:false,fetched:true,error:false,fetchData:action.payload};
            break;
        case 'songList_Fetch_REJECTED':
            state = {...state,isFetching:false,fetched:false,error:true}
            break;
        case 'songList_Upload_Fetch_PENDING':
            state ={...state,isUploading:true,uploaded:false,uploadError:false};
            break;
        case 'songList_Upload_Fetch_FULFILLED':
            state = {...state,isUploading:false,uploaded:true,uploadError:false,fetchData:{...state.fetchData,playlists:[...state.fetchData.playlists,...action.payload]}};
            break;
        case 'songList_Upload_Fetch_REJECTED':
            state = {...state,isUploading:false,uploaded:false,uploadError:true}
            break;
        default:{
            
        }
    }
    return state;
}