export const isBottomReducer = (state={isBottom:false,nextPage:0},action)=>{
    switch(action.type){
        case 'isBottom_Y':
            let currentPage = state.nextPage+1;
            state = {...state,isBottom:true,nextPage:currentPage};
            break;
        case 'isBottom_N':
            state = {...state,isBottom:false};
            break;
        case 'isBottom_clearPage':
            state = {...state,nextPage:0}
            break;
        default:{
        }
    }
    return state;
}