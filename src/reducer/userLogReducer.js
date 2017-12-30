export const userLogReducer = (state={isLog:false , userLogData:null},action) =>{

    if(localStorage.getItem('cloundMusic_isLog') && localStorage.getItem('cloundMusic_userLogData')){

        state={isLog:true , userLogData: JSON.parse(localStorage.getItem('cloundMusic_userLogData'))}

    }

    switch(action.type){
        case 'userLog_LogIn':{
            state = { isLog:true , userLogData: action.payload };

            break;
        }
        case 'userLog_LogOut':{

            state = { isLog:false , userLogData:null };
            break;            
        }
        default:{}
    }
    return state;
}