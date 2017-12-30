import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_Us;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankUS = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankUS;