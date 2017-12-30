import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_iTunes;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankiTunes = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankiTunes;