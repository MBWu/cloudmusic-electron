import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';


const mapStateToProps = (state)=>{
    return state.rank_French;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankFrench = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankFrench;