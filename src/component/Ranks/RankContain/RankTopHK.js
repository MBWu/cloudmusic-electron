import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_TopHK;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankTopHk = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankTopHk;