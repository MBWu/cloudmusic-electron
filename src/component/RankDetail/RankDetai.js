import {connect} from 'react-redux';

import RankDetailUI from './RankDetailUI.js';

const mapStateToProps = (state)=>{
    return state.songListDetail;
}

const mapDispatchToProps = (dispatch)=>{
    return {

    }
}

const RankDetail = connect(mapStateToProps,mapDispatchToProps)(RankDetailUI);

export default RankDetail;