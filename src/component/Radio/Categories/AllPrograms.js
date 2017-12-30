import React ,{Component} from 'react';

export default class AllPrograms extends Component{
    render(){
        return (
            <div style={{marginTop:10}} >
            <div
              style={{
                fontSize: 20,
                lineHeight: "32px",
                borderBottom: "3px solid #E1E1E1",
                width: 110,
                textAlign: "center"
              }}
            >
              全部节目
            </div>
            <div
              style={{
                borderTop: "1px solid #E1E1E1",
                overflow: "hidden"
              }}
            >
              <div className="clearfix" style={{paddingTop:20, width: 760 }}>
                <div style={{height:196,lineHeight:'196px',textAlign:'center'}} >没有相应的API - -！</div>
              </div>
            </div>
          </div>
        )
    }
}

