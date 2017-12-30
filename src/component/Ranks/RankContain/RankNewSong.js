import {connect} from 'react-redux';

import RankContain from './RankContain.js';

const mapStateToProps = (state)=>{
    return state.rank_newSong;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankNewSong = connect(mapStateToProps,mapDispatchToProps)(RankContain);
export default RankNewSong;