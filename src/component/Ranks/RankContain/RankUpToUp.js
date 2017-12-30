import {connect} from 'react-redux';

import RankContain from './RankContain.js';

const mapStateToProps = (state)=>{
    return state.rank_upToUp;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankUpToUp = connect(mapStateToProps,mapDispatchToProps)(RankContain);
export default RankUpToUp;