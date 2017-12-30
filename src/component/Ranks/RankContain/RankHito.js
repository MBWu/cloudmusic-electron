import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';


const mapStateToProps = (state)=>{
    return state.rank_Hito;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankHito = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankHito;