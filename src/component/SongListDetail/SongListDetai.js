import {connect} from 'react-redux';

import SongListDetailUI from './SongListDetailUI.js';

const mapStateToProps = (state)=>{
    return state.songListDetail;
}

const mapDispatchToProps = (dispatch)=>{
    return {

    }
}

const SongListDetail = connect(mapStateToProps,mapDispatchToProps)(SongListDetailUI);

export default SongListDetail;