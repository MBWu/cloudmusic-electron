import React ,{Component} from 'react';
import {Link,Route} from 'react-keeper';
import classnames from 'classnames/bind.js';

import styls from '../../../App.css';
import {store} from '../../store.js';
import styles from '../../../App.css';
import vol from '../../../images/vol.png';
import notVol from '../../../images/not-vol.png';
import dot from '../../../images/dot-white.png';
import loop from '../../../images/loopIcon.png';
import playOrder from '../../../images/playOrder.png';
import playRandom from '../../../images/playRandom.png';
import songWords from '../../../images/songWords.png';
import songlist from '../../../images/songlist.png';
import addFile from '../../../images/addFile.png';
import trash from '../../../images/trash.png';

let cx = classnames.bind(styles);

const Modes = [loop,playOrder,playRandom];

export default class SmallControlComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          processWidth: 0, //记录当前的音量条
          startProcess: 0, //记录开始滑动时的进度条位置
          startPoint: 0, //记录鼠标点下是的ClientX
          mousePress: false, //由于不能够解绑事件，我也不知道为什么，查了很多资料，和我解绑的方式一样就是解不了，所以这里添加一个控制流
          playlistShow: false, //是否显示播放列表
        };
      }
      componentDidMount(){
        this.processDot.addEventListener("mousedown", this.MouseDown.bind(this));
        //优化mousemove事件
        this.processDot.addEventListener("mouseup", this.MouseUp.bind(this));
        this.processDot.addEventListener("mouseleave", this.MouseUp.bind(this));
        this.processDot.addEventListener("mouseout", this.MouseUp.bind(this));

        this.setState({ //初始化音量
          processWidth: this.props.currentVol*100
        });
      }
      componentWillReceiveProps() {
        //上层传入的props改变时触发

            this.setState({ //每当current发生改变的时候重新计算 processWidth进度条的长度
                processWidth: this.props.currentVol*100
              });
       
      }
      MouseDown(e) {

        let processWidth = this.state.processWidth;
    
        this.setState({
          startPoint: e.clientX, //记录拖动前的鼠标按下的点
          startProcess: processWidth, //记录拖动前的进度条
          mousePress: true //记录鼠标按下
        });
    
        //只有在鼠标按下后才注册鼠标移动事件
        this.processDot.onmousemove = this.MouseMove.bind(this);
      }
      MouseMove(e) {
        if (this.state.mousePress) {
          this.setState(prev => {
            let moveX = e.clientX - prev.startPoint + prev.startProcess;
            //边界处理
            if (moveX > this.processDot.parentNode.parentNode.offsetWidth) {
              moveX = this.processDot.parentNode.parentNode.offsetWidth; //如果向右拖得太厉害，就等于总进度条长度
            } else if (moveX < 0) {
              moveX = 0; //如果向左拖得太厉害，就等于0
            }
            let current =
              moveX *
              this.props.maxVol /
              this.processDot.parentNode.parentNode.offsetWidth; 
            this.props.ChangeVol(current);//将拖动后重新计算的current返回上层
            return {};
          });
        }
      }
      MouseUp(e) {
        this.processDot.onmousemove = () => {};
        this.setState({
          mousePress: false
        });
      }

      ClickToChangePlayMode(){ //切换歌曲播放模式
          store.dispatch({
              type:'songPlayer_change_playMode'
          });
      }

      ClickToggleShowList(){//点击显示或者隐藏播放列表
        this.setState((prev)=>{
          return {
            playlistShow: !prev.playlistShow
          }
        });
      }
      ClickCloseList(){ //点击歌曲列表盒子外，关闭歌曲列表
        this.setState({
          playlistShow:false
        })
      }
     
    render(){
        let playmode = Modes[this.props.playmode];

        return (
            <div className='SmallControlComponent_WrapBox' >

                {
                  //静音按钮
                }
                
                <a className='SmallControlComponent_VolBox' style={{backgroundImage:`url(${this.props.muted?notVol:vol})`}} onClick={this.props.ToggleMuted} ></a>
                
                {
                  //调节音量盒子
                }
                <div className='ProcessBar_Process SmallP'  >
                    <div className='ProcessBar_CurrentProcess ProcessBar_Process' style={{width:this.state.processWidth}} >
                        {
                          //调节音量的小球
                        }
                        <span ref={(input)=>{this.processDot = input;}} className='ProcessBar_Dot' style={{backgroundImage:`url(${dot})`}} ></span>
                    </div>
                </div>

                      {
                        //设置播放模式
                      }
                    <a className='SmallControlComponent_VolBox SmallControlComponent_PlayMode' style={{backgroundImage:`url(${playmode})`}}
                        onClick={this.ClickToChangePlayMode}

                    ></a>

                    {
                      //底部显示歌词按钮，待开发
                    }
                    <a className='SmallControlComponent_VolBox SmallControlComponent_SongWords' style={{backgroundImage:`url(${songWords})`}} ></a>

                    {
                      //歌单按钮
                    }
                    <a className='SmallControlComponent_VolBox  SmallControlComponent_SongList' style={{backgroundImage:`url(${songlist})`}}
                      onClick={
                        //点击显示或者隐藏播放列表
                        this.ClickToggleShowList.bind(this)
                      }
                    >
                        <span className='SongNum' >{this.props.songlist.length}</span>
                    </a>

                    {
                      //歌单列表
                    }
                    
                    {this.state.playlistShow?<List songlist={this.props.songlist} />:null}

                    {
                      
                              //当歌单显示的时候显示，且在歌单列表后面透明，点击该盒子关闭歌单列表
                      
                    }
                    {this.state.playlistShow?(
                      <div className='SmallControlComponent_List_Cover'
                      onClick={
                        this.ClickCloseList.bind(this)
                      }
                    >
                    </div>
                    ):null}
            </div>
        )
    }
}

//歌单列表
class List extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeLink:null
    }
  }
  ClickClearList(){ //点击清空歌曲列表
    store.dispatch({
      type:'songPlayer_Clean'
    });
  }
  ClickToActive(index){ //单击激活item
    this.setState({
      activeLink:index
    })
  }
  render(){
    return(
      <div className='SmallControlComponent_List_WrapBox' >

      {
        //切换播放列表和历史记录的按钮
      }
      <div className='SmallControlComponent_List_Links' >
      {
        //<a className='SmallControlComponent_List_Link_Left'>播放清单</a>
      }
      </div>


      {

        //功能栏  ， 收藏，清空

      }
      <div className='SmallControlComponent_List_FunBar' >
        <span className='SmallControlComponent_List_FunBar_SongCount' >总{this.props.songlist.length}首</span>
        <div className='SmallControlComponent_List_FunBar_Btn' >
          <span className='SmallControlComponent_List_addFile' style={{backgroundImage:`url(${addFile})`}} >收藏全部</span>
          <span className='SmallControlComponent_List_trash' style={{backgroundImage:`url(${trash})`}}
            onClick={
              this.ClickClearList
            }
          >清空</span>
        </div>
      </div>
      
      {

        //歌曲列表

      }
      <div className='SmallControlComponent_List_Contain' >
        {this.props.songlist.map((value,index)=>{
          return (
            <Item key={`${value.id}+${index}`} value={value} index={index} activeLink={this.state.activeLink} ClickToActive={this.ClickToActive.bind(this)} />
          )
        })}
      </div>
    </div>
    )
  }
} 

const Item = props=>{
  let WrapBoxClassName=cx({
    clearfix:true,
    SmallControlComponent_Item_WrapBox:true,
    SmallControlComponent_Item_WrapBox_Single:props.index%2!==0, //单数item背景颜色
    SmallControlComponent_Item_WrapBox_Active: props.index === props.activeLink
  });

  let min = Math.floor(props.value.dt/1000/60);
  let sec = Math.floor(props.value.dt/1000%60);

  const DoubleClickToPlay= async (index) =>{ //双击播放歌曲
    await store.dispatch({
      type:'songPlayer_DoubleClickToPlay',
      payload:index
    });

    props.ClickToActive(null); //双击播放后取消激活

  }

  return (
    <div className={WrapBoxClassName} 

    //单击激活
    onClick={()=>{
      console.log(props.value);
      props.ClickToActive(props.index);
    }}
    
    //双击播放
    onDoubleClick={()=>{
      //传入该Item 的index 到reducer内，索引id

      DoubleClickToPlay(props.index);
    }}
    >
    {
      //歌曲名字
    }
      <div className='SmallControlComponent_Item_Name' >
        <span>{props.value.name}</span>
      </div>

      {
        //歌手名字
      }
      <div className='SmallControlComponent_Item_Artist' >
        <span>{props.value.ar.map((value,index)=>{
          if(index === (props.value.ar.length-1)){
            return `${value.name} `
          }else{
            return `${value.name} ,`
          } 
        })}</span>
      </div>

      {
        //时长
      }
      <div className='SmallControlComponent_Item_Time' >
      {min<10?`0${min}`:min}:{sec<10?`0${sec}`:sec}
      </div>
    </div>
  )
}