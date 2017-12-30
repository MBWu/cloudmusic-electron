import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_Acg;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankAcg = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankAcg;