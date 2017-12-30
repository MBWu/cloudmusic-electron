import React ,{Component} from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import {connect} from 'react-redux';

import {store} from '../../store.js';
import user_unlog from '../../../images/user_unlog.png';
import LogBg from '../../../images/LogBg.png';
import phone from '../../../images/Phone.png';
import lock from '../../../images/lock.png';
import logOut from '../../../images/logOut.png';
import leftArrow from '../../../images/leftArrow.png';

class UserLogUI extends Component{
    constructor(props){
      super(props);
      
      //初始化state
      this.state = {
        showBannel:false,
        phoneNum:undefined, //手机号码
        password:undefined, //密码
        autoLog:false, //自动登录
        tips: null, //表单验证错误信息
        logError:false,
      }

    }

    ClickToShowLogBannel(){

        this.setState({
          showBannel:true
        });

    }

    ClickToCloseLogBannel(){
      //关闭面板
      this.setState({
        showBannel: false
      })

    }

    HandleChangeInput(e){//表单处理

      const value = e.target.type === 'checkbox'? e.target.checked : e.target.value;

      const name = e.target.name;

      this.setState({
        [name] : value
      });
      
    }

    ClickToLogIn(){
      //表单验证
      //1.手机号必须是11位，且必须全是数字
      //2.密码不能小于6位

      if( this.state.phoneNum === undefined || `${ parseInt( this.state.phoneNum )}`.length !== 11 || isNaN( parseInt ( this.state.phoneNum ) ) ){

          this.setState({
            tips : '手机号必须是11位数字'
          });

      }else if( this.state.password === undefined || this.state.password.length < 6 ){

          this.setState({
            tips : '密码不能为空且不能小于6位',
            password: undefined
          });

      }

      this.LogInFetch();

    }

    LogInFetch(){

      //fetch发送登录请求
      fetchJsonp( `http://localhost:3000/login/cellphone?phone=${this.state.phoneNum}&password=${this.state.password}`,{timeout:10000} )
      .then(response=>response.json(),error => {

        //网络异常

        this.setState({ 
          tips: '网络异常',
          logError: true
        })

      }).then(json =>{
        
        if( !this.state.logError ){

           //表单验证 code  501，账号不存在  ； 502，密码错误  ; 200 登录成功
          if(json.code === 501){
            
            this.setState({
              tips: '账号不存在'
            });

          }else if(json.code === 502){

            this.setState({
              tips: '密码错误'
            });

          }else if(json.code === 200 ) {

            //登录成功
            this.setState({
              showBannel:false
            });

            store.dispatch({
              type: 'userLog_LogIn',
              payload: json
            });

            //如果自动登录被勾选，将isLog 和 用户的数据存入localStorage
            if(this.state.autoLog){
              
              localStorage.setItem('cloundMusic_isLog',true);

              localStorage.setItem('cloundMusic_userLogData',JSON.stringify(json));

            }

          }

        }

      });
    }

    clickToLogOut(){

      this.setState({
        showBannel: false
      })

      store.dispatch( {
        type: 'userLog_LogOut'
      } )

      if(this.state.autoLog){

        localStorage.removeItem( 'cloundMusic_isLog' );
        localStorage.removeItem( 'cloundMusic_userLogData' );

      }

    }

    render(){
      return (
        <div
        className="HeaderBanner_UserLog_WrapBox"
        
      >
      
        <div className='HeaderBanner_UserLog_User' style={{backgroundImage:`url(${this.props.isLog? this.props.userLogData.profile.avatarUrl : user_unlog})`}}
          onClick= { this.ClickToShowLogBannel.bind(this) }
        >
        
        </div>
        
        
        {
          //登录面板
        }
        
        
        {this.state.showBannel && !this.props.isLog ? //没有登录且showBannel = true
          
          <div className='HeaderBanner_UserLog_LogBannel'    >
          
                    <div className='HeaderBanner_UserLog_Bg' style={{ backgroundImage:` url( ${LogBg} ) ` }} >
          
                      {
                    //关闭登录面板
                  }
                  <span className='HeaderBanner_UserLog_Close'
                    onClick={
                      this.ClickToCloseLogBannel.bind(this)
                    }
                  >X</span>
          
                      <div className='HeaderBanner_UserLog_FormBox' >
          
                          {
                            //登录表单
                          }
                          <form action='javascript:void(0)' >
          
                            {
                              //手机号
                            }
                            <div className='HeaderBanner_UserLog_inputBox' >
                            <span className='HeaderBanner_UserLog_PhoneSpecial' >+86</span>
                              <input type='text' className='HeaderBanner_UserLog_input'
                               style={{backgroundImage: ` url( ${phone} ) ` }}
                               placeholder='请输入手机号'
                               name='phoneNum'
                               autoComplete='off'
                               onChange={
                                 this.HandleChangeInput.bind(this)
                               }
                               />
          
                            </div>
          
                            {
                              //密码
                            }
                            <div className='HeaderBanner_UserLog_inputBox HeaderBanner_UserLog_Password' >
                            <input type='password' className='HeaderBanner_UserLog_input'
                            style={{backgroundImage: ` url( ${lock} ) ` }}
                            placeholder='请输入密码'
                            name='password'
                            onChange={
                              this.HandleChangeInput.bind(this)
                            }
                            />
                            </div>
          
                            {
                              //登录提示盒子
                            }
                            <div className='HeaderBanner_UserLog_TipBox' >
                              <span className='HeaderBanner_UserLog_AutoLog'  >
                                <input type='checkbox' 
                                name='autoLog'
                                onChange={
                                  this.HandleChangeInput.bind(this)
                                }  />
                                自动登录                  
                              </span>
                              <span className='HeaderBanner_UserLog_Tip' >
                                {this.state.tips}
                              </span>
                            </div>
                            {
                              //登录按钮
                            }
                            <a className='HeaderBanner_UserLog_Log'
                              onClick={this.ClickToLogIn.bind(this)}
                            >
                              登录
                            </a>
                          </form>
                      </div>
                    </div>
                  </div>
          : null }


          {
            //退出面板
          }

          {this.props.isLog && this.state.showBannel ? (

            <div className='HeaderBanner_UserLog_LogOut_WrapBox' >
              <a className='HeaderBanner_UserLog_LogOut' onClick={this.clickToLogOut.bind(this)} >
                <img src={logOut} className='HeaderBanner_UserLog_LogOutImg' />
                退出登录
                <img src={leftArrow} className='HeaderBanner_UserLog_LeftArrow' />
              </a>
            
          </div>
          ) : (
            null
          )}

      </div>
      )
    }
  }

  const mapStateToProps = state =>{
    return state.userLog;
  }
  const mapDispatchToProps = dispatch =>{
    return {}
  }

  const UserLog = connect(mapStateToProps,mapDispatchToProps)(UserLogUI);

  export default UserLog;