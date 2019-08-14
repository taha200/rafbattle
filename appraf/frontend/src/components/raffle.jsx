import React from 'react'
import './../App.css'
import twitterIcon from './../icons8-twitter-16.png'
import Datdrop from './../IconLogo.png'
import YoutubeImg from './../icons8-youtube-16.png'
import TimePicker from 'react-time-picker'
import firebase from 'firebase'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
export default class Raffle  extends React.Component{
    constructor(props) {
        super(props);
        this.state={
           ids:[],
           datdropBut:false,
           csGoBut:false,
           primeLinkBut:false,
           totaltask:0,
           disableComp:true,
           visible:true,
           renderPage:false,
           taskdone:0
        }
      }
      componentDidMount(){
        setTimeout((
        )=>{
               var getDATA= firebase.database().ref().child('/raffles').child(this.props.match.params.id)
               getDATA.on("value",(snapshot)=>{
                    console.log(snapshot.val())
                    var a= snapshot.val()
                    if(a.datDropUrl!==""){
                        this.setState({
                            datdropBut:true,
                            totaltask:this.state.totaltask + 1
                        })
                    }
                    else{
                        this.setState({
                            datdropBut:false
                        })
                    }
                    if(a.CsGoUUrl!==""){
                        this.setState({
                            csGoBut:true,
                            totaltask:this.state.totaltask + 1
                        })
                    }
                    else{
                        this.setState({
                            csGoBut:false
                        })
                    }
                    if(a.primeLinkUrl!==""){
                        this.setState({
                            primeLinkBut:true,
                            totaltask:this.state.totaltask + 1
                        })
                    }
                    else{
                        this.setState({
                            primeLinkBut:false
                        })
                    }
                    
               })
                    this.setState({
                        visible:false,
                        renderPage:true
                    })
            },3000)
      }
      taskDoneGo = ()=> {
          this.setState({
              taskdone:this.state.taskdone + 1
          })
          if(this.state.taskdone===this.state.totaltask)
          {
              this.setState({
                  disableComp:false
              })
          }
      }
    render(){
        return(
            <div>
                {this.state.visible &&    <div className="d-flex justify-content-center" style={{marginTop:'20%'}}>
                 <Loader
         type="Rings"
         color="purple"
         height="100"
         width="100"
      />
      </div>}
             
        {this.state.renderPage && <div>  <header >
    <div class="row headmain">
      <div class="col-sm-2 twitterr">
          <a href="#"><img src={twitterIcon} alt="twiterr" />Login</a>
      </div>
	  <div class="col-sm-2"></div>
      <div class="col-sm-4 head1"><img src={Datdrop} alt="icon" /><h2><span>FREE DATDROP</span> BATTLE</h2>
      </div>
	  <div class="col-sm-2 yt">
          <a href="#"><img src={YoutubeImg} alt="yt" />Approved Youtuber</a>
      </div>
	  <div class="col-sm-1 create"><a href= "#"><span>Create</span> Raffle</a>
      </div>
    </div>
</header>
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col">
      
    </div>
    <div class="col main">
	<div class="flex-container">
  <div class="head2"><h3>JOIN <span>REFFLE</span></h3></div>
 
      {this.state.datdropBut &&  <div class="col-sm dat"> <a href="#" onClick={this.taskDoneGo}>visit datdrop</a> </div>}
 
 
  {this.state.csGoBut &&  <div class="col-sm prime">  <a href="#"  onClick={this.taskDoneGo}>visit CS GO EMPIRE</a> </div> }
  
 
  {this.state.primeLinkBut &&  <div class="col-sm go"> <a href="https://www.google.com" target="_blank"  onClick={this.taskDoneGo}>visit PrimeLink</a> </div>  }
 
  <div class="para"> <p>{this.state.taskdone}/{this.state.totaltask} Task completed</p></div>  
   <div class="comp"><button type="button" class="btn btn-light" disabled={this.state.disableComp}>Complete</button></div>
</div>
	
    </div>
    <div class="col">
     
    </div>
  </div>
  </div>
  </div>
}
               
            </div>
        )
    }
}