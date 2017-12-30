
export const songPlayerReducer = (state={isPlay:false,playMode:0,id:null,vol:1,muted:false,index:0,songList:[]},action)=>{
    //playMode 0:循环模式  1:顺序模式  2:随机模式
        
    //为了区分songPlayer是刚初始化还是刚清空，设置，初始化时state.id=null ，当清空后state.id = undefined
        if(state.id === null && localStorage.getItem('songPlayerSetting')){

            //将保存的用户操作返回，但是要保证没有播放歌曲

            state = JSON.parse(localStorage.getItem('songPlayerSetting'));
            state.isPlay = false;
        
        }

    let tempIndex=0,tempId=0,tempSonglist=[];
    switch(action.type){
        //播放器操作
        case 'songPlayer_toggle_Play':

        state= {...state,isPlay:action.payload};
        break;

        case 'songPlayer_change_muted':

        let toggleMuted = !state.muted;
        console.log(state.vol);
        
        state = {...state,muted:toggleMuted};
         //将state存入localStorage，保留用户操作
         localStorage.setItem('songPlayerSetting',JSON.stringify(state));
        break;

        case 'songPlayer_change_playMode':
        
        let mode = state.playMode;
        mode++;
        if(mode>2){//边界处理，确保mode：0～2
            mode = 0;
        }

        
        state ={...state,playMode:mode};

        //将state存入localStorage，保留用户操作
        localStorage.setItem('songPlayerSetting',JSON.stringify(state));
        break;


        case 'songPlayer_change_vol'://改变音量
            state = {...state,vol:action.payload};

             //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));
            break;

        //歌单操作
        case 'songPlayer_Prev': //播放上一首，歌单指针向前移

        switch(state.playMode){
            

            case 0||1:
            console.log(1);            
            if(state.index-1>=0){

                //改变歌单指针指向，改变当前歌曲id
                tempIndex = state.index-1;
                tempId = state.songList[tempIndex].id;
                
                state={...state,id:tempId,index:tempIndex,isPlay:false};

            }else{

                state ={...state,isPlay:false};

            }
            //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));

            break;

            case 2://随机模式

            tempIndex = Math.floor(Math.random()*(state.songList.length-1));
            tempId = state.songList[tempIndex].id;

            state = {...state,id:tempId,index:tempIndex,isPlay:false};

             //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));

            break;

        }
        break;

        case 'songPlayer_Next'://播放下一首，歌单指针向后移

            switch(state.playMode){
    
                case 1||0:
    
                if(state.index+1<state.songList.length){
    
                    tempIndex = state.index+1;
                    tempId = state.songList[tempIndex].id;

                    state={...state,id:tempId,index:tempIndex,isPlay:false};
    
                }else{
    
                    state ={...state,isPlay:false};
    
                }

                 //将state存入localStorage，保留用户操作
                localStorage.setItem('songPlayerSetting',JSON.stringify(state));

                break;
    
                case 2:
    
                tempIndex = Math.floor(Math.random()*(state.songList.length-1));
                tempId = state.songList[tempIndex].id;

                state = {...state,id:tempId,index:tempIndex,isPlay:false};

                //将state存入localStorage，保留用户操作
                localStorage.setItem('songPlayerSetting',JSON.stringify(state));   
                
                break;
    
            }

        break;
        
        case 'songPlayer_DoubleClickToPlay'://双击播放歌曲
            tempId = state.songList[action.payload].id;
            state = {...state,id:tempId};

            //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));
        break;

        case 'songPlayer_Insert'://双击添加歌曲，在歌单指针位置插入新歌曲，重新获取src

            tempSonglist = state.songList;
            tempSonglist.splice(state.index,0,action.payload);
            tempId = tempSonglist[state.index].id;

            state = {...state,songList:tempSonglist,id:tempId};

            //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));
        break;
        
        case 'songPlayer_AddAll':{ //添加全部歌曲到歌曲列表
            state={...state,songList:[...state.songList,...action.payload]}

            localStorage.setItem('songPlayerSetting',JSON.stringify(state));
            break;
        }

        case 'songPlayer_Clean'://清空歌单
        
            state = {...state,songList:[],id:undefined,index:0,isPlay:false};

            //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));
        break;

        case 'songPlayer_PlayAll'://播放全部

            state = {...state,songList:action.payload,index:0,id:action.payload[0].id,isPlay:false};

            //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));

        break;

        case 'songPlayer_PlayEnd': //播放结束

        switch(state.playMode){
            case 0: //需要Controler模块内的TimeUpdate方法内再做一些控制流，这里写出来只是为了增加代码阅读性,其实这个case是不用写的

            tempId = state.id;
            state = {...state,id:tempId};
            break;

            case 1:

            if(state.index+1<state.songList.length){

                tempIndex = state.index+1;
                tempId = state.songList[tempIndex].id;
                state={...state,id:tempId,index:tempIndex};

            }else{

                state ={...state,isPlay:false};

            }

            //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));

            break;

            case 2:

            tempIndex = Math.floor(Math.random()*(state.songList.length-1));
            tempId = state.songList[tempIndex].id;
            state = {...state,id:tempId,index:tempIndex};

            //将state存入localStorage，保留用户操作
            localStorage.setItem('songPlayerSetting',JSON.stringify(state));

            break;

        }
        break;

        default:{}
    }
    return state;
}