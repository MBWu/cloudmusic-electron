import {connect} from 'react-redux';

import RankContain from './RankContain.js';

const mapStateToProps = (state)=>{
    return state.rank_audio;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankAudio = connect(mapStateToProps,mapDispatchToProps)(RankContain);
export default RankAudio;