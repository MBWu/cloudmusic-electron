import React, { Component } from "react";
import { connect } from "react-redux";

//store
import { store } from "../../store.js";

// 前一首
import PrevSong from "./PrevSong.js"; 

//播放或者暂停
import PlayOrPuase from "./PlayOrPuase.js";

//下一首
import NextSong from "./NextSong.js";

//进度条
import ProcessBar from "./ProcessBar.js";

//其他小控件
import SmallControlComponent from "./SmallControlComponent.js";

//fetch
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

class ControlerUI extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      current: 0,
      canPlay: false,
      currentVol:this.props.vol,
    };
  }
  componentDidMount() {
    //初始化audio对象的src
    if(this.props.id !==null &&this.props.id !== undefined){
      fetchJsonp(`http://localhost:3000/music/url?id=${this.props.id}`,{timeout:20000})
      .then(response=>response.json()).then((json)=>{
        this.audio.src = json.data[0].url;
      });
    }
    //初始化audio对象的音量
    this.audio.volume = this.props.vol;

    //初始化audio对象的静音
    this.audio.muted = this.props.muted;
    
    this.audio.addEventListener("canplay", this.CanPlay.bind(this));
    this.audio.addEventListener("error", this.ErrorPlay.bind(this));
    this.audio.addEventListener("timeupdate", this.TimeUpdate.bind(this));
    this.audio.addEventListener("durationchange",this.Durationchange.bind(this));
    this.audio.addEventListener('volumechange',this.Volumechange.bind(this));
  }
  componentWillUnmount(){
    this.audio.removeEventListener("canplay", this.CanPlay.bind(this));
    this.audio.removeEventListener("error", this.ErrorPlay.bind(this));
    this.audio.removeEventListener("timeupdate", this.TimeUpdate.bind(this));
    this.audio.removeEventListener("durationchange",this.Durationchange.bind(this));
    this.audio.removeEventListener('volumechange',this.Volumechange.bind(this));
  }
  componentDidUpdate(prevProps) {
    //控制播放
    if (prevProps.isPlay !== this.props.isPlay) { //通过dispatch，改变store内部的isPlay属性后，这个组件就会收到接受新props的信息，从而触发生命周期
      if (this.props.isPlay) {
        //如果是isPlay = true ，那么就播放，
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }

    if (prevProps.muted !== this.props.muted) { //通过dispatch，改变 muted属性，触发生命周期，这样就可以相当于注册事件一样，触发函数，做逻辑了
      //如果muted = true ，就设置静音
      this.audio.muted = this.props.muted;
    }
    if ((prevProps.id !== this.props.id) && this.props.id !==undefined &&this.props.id !== null ) { //当前后id发生改变的时候，说明切换了歌曲，重新设置aduio的src，然后使其播放
      fetchJsonp(`http://localhost:3000/music/url?id=${this.props.id}`,{timeout:20000})
        .then(response=>response.json()).then((json)=>{
          this.audio.src = json.data[0].url;
          store.dispatch({
            type:'songPlayer_toggle_Play',
            payload:true,
          });
          this.audio.play();
        });
    }
  }
  
  CanPlay() {
    this.setState({
      //可以播放的时候，记录canPlay并记录音频时长
      canPlay: true,
      duration: this.audio.duration
    });
  }
  ErrorPlay() {
    //不可以播放的时候，记录canPlay，用于TogglePlay的控制流
    this.setState({
      canPlay: false
    });
  }
  TogglePlay() {
    //传入下层组件，点击触发播放或者暂停
    if (this.state.canPlay) {
      //只有在可以播放的时候，点击才可以播放或者暂停
      if (this.props.isPlay) {
        store.dispatch({
          type: "songPlayer_toggle_Play",
          payload: false
        });
      } else {
        store.dispatch({
          type: "songPlayer_toggle_Play",
          payload: true
        });
      }
    }
  }
  ToggleMuted() {
    //toggle 是否静音
    store.dispatch({
      type: "songPlayer_change_muted"
    });
  }
  TimeUpdate() {
    //当currentTime改变时就会触发该事件，将currentTime记录下来
    this.setState({
      current: this.audio.currentTime
    });

    //currentTime === duration时，定义为播放完成
    if (this.audio.currentTime === this.audio.duration) {
      if(this.props.playMode){
        store.dispatch({
          type:'songPlayer_PlayEnd'
        });
      }else{
        this.audio.currentTime = 0;
        this.audio.play();
      }
      
    }
  }
  Durationchange() {
    //当前音频时长改变时，重新记录时长,也就是当我切换audio的src时
    this.setState({
      duration: this.audio.duration
    });
  }
  Volumechange(){
    
    //音频音量改变的时候记录音量，作用于拖动音量条
    this.setState({
      currentVol: this.audio.volume
    });

    
  }
  ChangeCurrentTime(time) {
    //这个函数时用于在下层组件改变currentTime用的
    this.audio.currentTime = time; //当currentTime改变时，触发timeupdate时间
  }
  ChangeVol(vol){
    // vol = vol/100; //vol在0～1之内
    this.audio.volume = vol;


    store.dispatch({
      type:'songPlayer_change_vol',
      payload: vol
    });
  }
  PrevSong(){
    store.dispatch({
      type:'songPlayer_Prev'
    })
  }
  NextSong() {
    store.dispatch({
      //发送dispatch，改变store内的src属性，从而触发componentWillReceiveProps()生命周期,在周期内，感受到前后props的src改变，则修改audio的src，并进行播放
      type: "songPlayer_Next"
    });
  }
  render() {
    return (
      <div className="player">
        <div className=" clearfix ">
          <div className="Controler_WrapBox">
            {
              //上一首按钮
            }
            <PrevSong PrevSong={this.PrevSong} />
            {
              //播放或暂停按钮
            }
            <PlayOrPuase
              isPlay={this.props.isPlay}
              TogglePlay={this.TogglePlay.bind(this)}
            />
            {
              //下一首按钮
            }
            <NextSong
              NextSong = {this.NextSong}
            />
          </div>
          {
            //进度条 与时长
          }
          <ProcessBar
            duration={this.state.duration}
            current={this.state.current}
            ChangeCurrentTime={this.ChangeCurrentTime.bind(this)}
            isPlay={this.props.isPlay}
            canPlay={this.state.canPlay}
          />

          {
            //一些小控键，比如音量，静音，歌单。
          }
          <SmallControlComponent
            muted={this.props.muted}
            ToggleMuted={this.ToggleMuted.bind(this)}
            currentVol={this.state.currentVol}
            maxVol={1}
            ChangeVol={this.ChangeVol.bind(this)}
            playmode={this.props.playMode}
            songlist={this.props.songList}
          />
          {
            //真实的进度条，已经被隐藏了
          }
          <div className="Controler_RealProcessBar">
            <audio
              controls="controls"
              height="0"
              width="0"
              preload={true}
              ref={input => {
                this.audio = input;
              }}
            >
              <source src={this.props.src} type="audio/mp3" />
              <source src={this.props.src} type="audio/ogg" />
              <embed height="0" width="0" src={this.props.src} />
            </audio>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.songPlay;
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Controler = connect(mapStateToProps, mapDispatchToProps)(ControlerUI);
export default Controler;
