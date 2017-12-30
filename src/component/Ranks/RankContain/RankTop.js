import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_Top;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankTop = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankTop;