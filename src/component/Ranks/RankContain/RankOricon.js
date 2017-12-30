import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_Oricon;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankOricon = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankOricon;