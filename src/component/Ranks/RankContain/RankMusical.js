import {connect} from 'react-redux';

import GlobeContain from './GlobeContain.js';

const mapStateToProps = (state)=>{
    return state.rank_Musical;
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}

const RankMusical = connect(mapStateToProps,mapDispatchToProps)(GlobeContain);
export default RankMusical;