import React ,{Component} from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import {connect} from 'react-redux';

import styles from '../../../App.css';
import RCMRadio from './RCMRadio.js';
import AllPrograms from './AllPrograms.js';

 class CategoriesUI extends Component{
    render(){
        return (
            <div>
            <div className='Radio_Categories_WrapBox'>

                  {
                      //推荐电台
                  }
                <RCMRadio data={this.props.data.radioCategoriesRCM} /> 

                  {
                      //所有节目
                  }
                <AllPrograms data={this.props.data.radioCategoriesProgram } />
            </div>
          </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        data:{
            radioCategoriesRCM:state.radioCategoriesRCM,
            radioCategoriesProgram:state.radioCategoriesProgram
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {

    }
}

const Categories = connect(mapStateToProps,mapDispatchToProps)(CategoriesUI);



export default Categories;