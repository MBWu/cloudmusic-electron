import {connect} from 'react-redux';

import RankContain from './RankContain.js';

const mapStateToProps = (state)=>{
    return state.rank_hotSong;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankHotSong = connect(mapStateToProps,mapDispatchToProps)(RankContain);
export default RankHotSong;