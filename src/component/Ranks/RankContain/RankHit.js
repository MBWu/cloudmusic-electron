import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';


const mapStateToProps = (state)=>{
    return state.rank_Hit;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankHit = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankHit;