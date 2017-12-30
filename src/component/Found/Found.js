import React ,{Component} from 'react';
import {Route} from 'react-keeper';

import NavigationList from './NavigationList.js';

import Rank from "../Ranks/Rank.js";
import SongList from '../SongList/SongList.js';
import Radio from '../Radio/Radio.js';
import NewMusic from '../NewMusic/NewMusic.js';

const RCM = props=>{
    return (
        <div>
            <div style={{height:450,lineHeight:'450px',textAlign:'center'}} >没有对应的api @ '' @</div>
        </div>
    )
}

export default class Found extends Component{
    render(){
        return(
            <div>

                {
                    //导航栏
                }
                <NavigationList pathname={this.props.pathname} /> 

                {
                    //排行榜
                }
                <Route index path='/rank' component={Rank} />

                {
                    //歌单
                }
                <Route cache path='/songlist' component={SongList} />

                {
                    //电台
                }
                <Route path='/radio' component={Radio} /> 

                {
                    //最新音乐
                }
                <Route path='/newmusic' component={NewMusic} />

                {
                    //推荐
                }
                <Route path='/rcm' component={RCM} />
            </div>
        )
    }
}

