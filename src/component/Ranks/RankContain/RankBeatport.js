import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';


const mapStateToProps = (state)=>{
    return state.rank_Beatport;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankBeatport = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankBeatport;