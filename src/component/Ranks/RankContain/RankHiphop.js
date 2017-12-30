import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';


const mapStateToProps = (state)=>{
    return state.rank_Hiphop;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankHiphop = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankHiphop;