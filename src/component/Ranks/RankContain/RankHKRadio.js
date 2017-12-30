import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_HKRadio;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankHKRadio = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankHKRadio;