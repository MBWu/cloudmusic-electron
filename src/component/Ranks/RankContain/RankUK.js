import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_Uk;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankUk = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankUk;