import {connect} from 'react-redux';

import RankContain from './RankContain.js';

const mapStateToProps = (state)=>{
    return state.rank_createSong;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankCreateSong = connect(mapStateToProps,mapDispatchToProps)(RankContain);
export default RankCreateSong;