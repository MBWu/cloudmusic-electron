import React, { Component } from "react";

import styles from "../../../App.css";
import dot from "../../../images/dot.png";

export default class ProcessBar extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      processWidth: 0, //记录当前的进度条
      startProcess: 0, //记录开始滑动时的进度条位置
      clientX: 0,
      parentOffsetLeft: 0,
      startPoint: 0, //记录鼠标点下是的ClientX
      mousePress: false //由于不能够解绑事件，我也不知道为什么，查了很多资料，和我解绑的方式一样就是解不了，所以这里添加一个控制流
    };
  }
  shouldComponentUpdate(nextProps){
        if(nextProps.canPlay !==this.props.canPlay){ //如果更新的属性时canPlay
            if(nextProps.canPlay){//如果canPlay = true，就注册事件

                this.processDot.addEventListener("mousedown", this.MouseDown.bind(this));
                //优化mousemove事件
                this.processDot.addEventListener("mouseup", this.MouseUp.bind(this));
                this.processDot.addEventListener("mouseleave", this.MouseUp.bind(this));
                this.processDot.addEventListener("mouseout", this.MouseUp.bind(this));
                // 点击进度条，修改进度
                this.processBar.addEventListener('click',this.MouseClick.bind(this));
            }else{ //如果canPlay = false ，说明音频不能播放，则不可以拖动

                this.processDot.removeEventListener("mousedown", this.MouseDown.bind(this));
                //优化mousemove事件
                this.processDot.removeEventListener("mouseup", this.MouseUp.bind(this));
                this.processDot.removeEventListener("mouseleave", this.MouseUp.bind(this));
                this.processDot.removeEventListener("mouseout", this.MouseUp.bind(this));

                // 点击进度条，修改进度
                this.processBar.removeEventListener('click',this.MouseClick.bind(this));
                
            }
        }
        return true;
    }
  componentWillReceiveProps() {
    //上层传入的props改变时触发
    
    if(this.props.canPlay){
        this.setState({ //每当currentTime发生改变的时候重新计算 processWidth进度条的长度
            processWidth: this.props.current / this.props.duration * 407
          });
    }
    
    //优化事件注册，将SCU生命周期只注册一次
    // if (this.props.isPlay) {
    //   this.processDot.addEventListener("mousedown", this.MouseDown.bind(this));
    //   //优化mousemove事件
    //   this.processDot.addEventListener("mouseup", this.MouseUp.bind(this));
    //   this.processDot.addEventListener("mouseleave", this.MouseUp.bind(this));
    //   this.processDot.addEventListener("mouseout", this.MouseUp.bind(this));
    // }
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
        let currentTime =
          moveX *
          this.props.duration /
          this.processDot.parentNode.parentNode.offsetWidth; 
        this.props.ChangeCurrentTime(currentTime);//将拖动后重新计算的currentTime返回上层
        return {};
      });
    }
  }
  MouseUp(e) {
    
    this.processDot.onmousemove = () => {};
    // e.target.removeEventListener('mousemove',false);
    this.setState({
      mousePress: false
    });
  }
  
  MouseClick(e) {
    console.log('clienX'+e.clientX);
    console.log('offsetLeft'+this.processBar.parentNode.offsetLeft);
    console.log(e.clientX-this.processBar.parentNode.offsetLeft);
    let currentTime = ((e.clientX-this.processBar.parentNode.offsetLeft)*this.props.duration)/407;//407是进度条的总长，这里我不想再使用ref去添加非控件，因为老是操纵DOM，就没有react的精髓了
    this.props.ChangeCurrentTime(currentTime);
  }
  render() {
    let durM = Math.floor(this.props.duration / 60);
    let durS = Math.floor(this.props.duration % 60);
    let curM = Math.floor(this.props.current / 60);
    let curS = Math.floor(this.props.current % 60);

    return (
      <div className="ProcessBar_WrapBox" >

      {
        //总进度条
      }
        <div className="ProcessBar_Process" ref={(input)=>{this.processBar=input}} >

        {
          //已播放进度条
        }
          <div
            className="ProcessBar_CurrentProcess ProcessBar_Process"
            style={{ width: this.state.processWidth }}
          >

            {
              //进度条的小圆球
            }
            <span
              className="ProcessBar_Dot"
              ref={input => {
                this.processDot = input;
              }}
              style={{ backgroundImage: `url(${dot})` }}
            />
          </div>
        </div>

        {
          // 时长
        }
        <div className="ProcessBar_TimeBox">
          <span>
            {curM < 10 ? `0${curM}` : curM}:{curS < 10 ? `0${curS}` : curS}
          </span>
          <span>/</span>
          <span>
            {durM < 10 ? `0${durM}` : durM}:{durS < 10 ? `0${durS}` : durS}
          </span>
        </div>
      </div>
    );
  }
}
