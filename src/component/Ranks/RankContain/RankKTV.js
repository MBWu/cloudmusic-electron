import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_KTV;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankKTV = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankKTV;