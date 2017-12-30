export const radioDetailProgramsReducer = (state={isFetching:true,error:false,fetched:false,fetchData:null,isUploading:false,uploadError:false,uploaded:false},action)=>{
    switch(action.type){
        case 'radioDetailPrograms_Fetch_PENDING':
            state={...state,isFetching:true,error:false,fetched:false};
            break;
        case 'radioDetailPrograms_Fetch_FULFILLED':
            state={...state,isFetching:false,error:false,fetched:true,fetchData:action.payload};
            break;
        case 'radioDetailPrograms_Fetch_REJECTED':
            state={...state,isFetching:false,error:true,fetched:true};
            break;
        case 'radioDetailPrograms_Upload_Fetch_PENDING':
            state={...state,isUploading:true,uploadError:false,uploaded:false};
            break;
        case 'radioDetailPrograms_Upload_Fetch_FULFILLED':
            state={...state,isUploading:false,uploadError:false,uploaded:true,fetchData:{...state.fetchData,programs:[...state.fetchData.programs,...action.payload.programs]}};
            break;
        case 'radioDetailPrograms_Upload_Fetch_REJECTED':
            state={...state,isUploading:false,uploadError:true,uploaded:true};
            break;
        default:{
            
        }
    }
    return state;
}
