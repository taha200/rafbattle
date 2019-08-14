import React from 'react';
import logo from './logo.svg';

import firebase from 'firebase'
import TimePicker from 'react-time-picker';
import Form from './components/form'
import { arrayExpression } from '@babel/types';
import Raffle from './components/raffle'
import editIcon from './icons8-edit-64.png'
import timeIcon from './icons8-time-24.png'
import raffleLink from './icons8-link-24.png'
import trash from "./icons8-delete-trash-24.png"
import twitterIcon from './icons8-twitter-16.png'
import Datdrop from './IconLogo.png'
import YoutubeImg from './icons8-youtube-16.png'
import socketIOClient from "socket.io-client";
import Modal from 'react-responsive-modal'
export class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
       ids:[],
       data:[],
      dates:'-06-08',
      time:'',
      days:'',
      hours:'',
      minutes:'',
      seconds:'',
      obj:{},
      endingDate:[],
      remainingTIme:[],
      dataRenderPage:[],
      response: false,
      endpoint: "http://127.0.0.1:8000",
      Open:false
    }
  }
  componentDidMount(){
  
    var dataRef=firebase.database().ref().child('/raffles')
  dataRef.on('child_added',(data)=>{
    var arr=this.state.ids
    arr.push(data.key)
    this.setState({
      ids:arr
    })
  })
//   // setTimeout(()=>{
//   //   var hostref=firebase.database().ref().child('/raffles').child(this.state.ids[9])
//   //  hostref.on('value',(snapshot)=>{
//   //       var a=snapshot.val()
//   //       var b=a.participants
//   //         b.push('cddcd')
//   //       hostref.update({
//   //         participants:b
//   //       })

//   //  })
setTimeout(()=>{
  var datam= this.state.ids.map((data)=>{
    console.log(data)
       var dat = dataRef.child(data)
          dat.on('value',(snapshot)=>{
              var obje=snapshot.val()
              this.setState({
                obj:obje
              })
  })
 return this.state.obj
   })
   this.setState({
     data:datam
   })
   const { endpoint } = this.state;
   const socket = socketIOClient(endpoint);
   socket.on("Fromfirebase", data => this.setState({ response: data }));
},5000)


//   console.log(this.state.data)
//   // var x=setInterval(()=>{
//   //   var arra=[]
//   //   var aars=[]
//   //    this.state.data.forEach((value)=>{
//   //      aars.push(value.EndingDate)
//   //      var countDownDate = new Date(value.EndingDate).getTime();
//   //     // Get today's date and time
//   //     var now = new Date().getTime();
    
//   //     // Find the distance between now and the count down date
//   //     var distance = countDownDate - now;
    
//   //     // Time calculations for days, hours, minutes and seconds
//   //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//   //       value.days=days
//   //       value.hours=hours
//   //       value.minutes=minutes
//   //       value.seconds=seconds
//   //       console.log(value)
//   //       arra.push(value)
//   //     // Display the result in the element with id="demo"
//   //     //  this.setState({
//   //     //    days:days,
//   //     //    hours:hours,
//   //     //    minutes:minutes,
//   //     //    seconds:seconds
//   //     //  })
    
//   //     // If the count down is finished, write some text
//   //     this.setState({
//   //       data:arra
//   //     })
//   //     console.log(this.state.data)
//   //     if (distance < 0) {
//   //       clearInterval(x);
//   //     }
//   //    },1000)
 
// })
//},5000)
// //  var datam= this.state.ids.map((data)=>{
// //    console.log(data)
// //       var dat = dataRef.child(data)
// //          dat.on('value',(snapshot)=>{
// //               return snapshot.val()
// //          })
// //   })
// //   this.setState({
// //     data:datam
// //   })

  }
        
  componentWillMount(){
    // Initialize Firebase
 if(!firebase.apps.length){
   var config = {
    apiKey: "AIzaSyBo0e53GXO5ftf6_MKjjBjtkWVk8lRxRq0",
    authDomain: "practice-6fb3e.firebaseapp.com",
    databaseURL: "https://practice-6fb3e.firebaseio.com",
    projectId: "practice-6fb3e",
    storageBucket: "practice-6fb3e.appspot.com",
    messagingSenderId: "749248417122",
    appId: "1:749248417122:web:d42b6e3aba544e4d"
     };
     firebase.initializeApp(config);
 }
 
 
}

takeDate(e){
  var date=e.target.value
   this.setState({
     dates:date
   })
}
onChange =(time)=>{
      var tim=`${time}:25`
 this.setState({
   time:tim
 })
}
openModal(e){
  
   this.setState({
     open:true
   })

}
onCloseModal = ()=>{
  this.setState({
    open:false
  })
}

CalculateRemaining(){

  //   var a=  this.state.dates.split("-")
    //  var dataRed=firebase.database().ref().child('/raffles')
    //  dataRed.push({
    //    EndingDate:`08 11 2019 ${this.state.time}`
    //  })
    //   dataRed.on('child_added',(data)=>{
    //       var arr=this.state.ids
    //       arr.push(data.key)
    //       this.setState({
    //         ids:arr
    //       })
    //       console.log(this.state.ids)
    //   })
    console.log(this.state.data)
      // var x = setInterval(()=> {
      //   var countDownDate = new Date(`08 11 2019 ${this.state.time}`).getTime();
      //   // Get today's date and time
      //   var now = new Date().getTime();
      
      //   // Find the distance between now and the count down date
      //   var distance = countDownDate - now;
      
      //   // Time calculations for days, hours, minutes and seconds
      //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      //   // Display the result in the element with id="demo"
      //    this.setState({
      //      days:days,
      //      hours:hours,
      //      minutes:minutes,
      //      seconds:seconds
      //    })
      
      //   // If the count down is finished, write some text
      //   if (distance < 0) {
      //     clearInterval(x);
      //   }
      // }, 1000);
}
  render(){
    
    setTimeout(()=>{
    //   var arrb=[]
    // var x=setInterval(()=>{
    //   arrb=this.state.endingDate.map((value)=>{
            
    //           var countDownDate = new Date(value).getTime();
    //           // Get today's date and time
    //           var now = new Date().getTime();
            
    //           // Find the distance between now and the count down date
    //           var distance = countDownDate - now;
            
    //           // Time calculations for days, hours, minutes and seconds
    //           var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //           var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //           var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //           var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
    //           // Display the result in the element with id="demo"
               
              
    //           // If the count down is finished, write some text
    //           if (distance < 0) {
    //             clearInterval(x);
    //           }
    //           return ` ${days} ${hours} ${minutes} ${seconds} `
    //         })
    //        this.setState({
    //          remainingTIme:arrb
    //        })
    //    },1000)
         var bcd= this.state.data.map((value)=>{
            return <DataRender ob={value} />
       })
       this.setState({
         dataRenderPage:bcd
       })

    },7000)
                  
    return(
      // <div>
      //   <p>{this.state.response}</p>
      // </div>
      <section class="wrapper">  
<header>
   <div class="row headmain">
    <div class="col-sm-2 twitterr"><a href="#"><img src={twitterIcon} alt="twiterr" />Login</a></div>
	  <div class="col-sm-2"></div>
    <div class="col-sm-4 head1"> <img src={Datdrop} alt="icon" /><h2><span>FREE DATDROP</span> BATTLE</h2></div>
  <div class="col-sm-2 yt"><a href="#" onClick={(e)=>{this.openModal(e)}}><img src={YoutubeImg} alt="yt" />Create Raffle</a></div>
 <div class="col-sm-1 create"><a href="#"><span>Create</span> Raffle</a></div>
    </div>
 </header>
 <button onClick={(e)=>this.openModal(e)}>Open Modal</button>
 <Modal  closeIconSize="15" open={this.state.open} onClose={this.onCloseModal} center focusTrapped>
      <div>
      <div style={{textAlign:'center',borderBottom:'2px black solid',paddingTop:10,paddingBottom:10,fontSize:20,margin:0}}>
        Approved Youtuber For Creating Raffles
       
      </div>
	
<div>
  <ul>
  <li style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h3>Headline</h3>
    <button type="button" class="btn btn-danger">Delete</button>
    </li>
      
    <li style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h3>Headline</h3>
    <button type="button" class="btn btn-danger">Delete</button>
    </li>
    <li style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h3>Headline</h3>
    <button type="button" class="btn btn-danger">Delete</button>
    </li>
    <li style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h3>Headline</h3>
    <button type="button" class="btn btn-danger">Delete</button>
    </li>
    <li style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h3>Headline</h3>
    <button type="button" class="btn btn-danger">Delete</button>
    </li>
    <li style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h3>Headline</h3>
    <button type="button" class="btn btn-danger">Delete</button>
    </li>
    <li style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h3>Headline</h3>
    <button type="button" class="btn btn-danger">Delete</button>
    </li>
  </ul>
  <div class="form-group" >
  <p>Add User By inputting their Twitter User Name</p>
  <input  type="text" style={{backgroundColor:'white'}} class="form-control" id="usr"  />
 
</div>
<button type="button" class="btn btn-success">Success</button>
</div>
      </div>
         
        </Modal>
{this.state.dataRenderPage}


   
//     {/* <div class="col-md-3 col-sm-3 column">
	  
//     <div class="heading3"><h3>BATTLE <span>VALUVE</span></h3></div> 
// <div class="edlt">	<div class="edt"><img src={editIcon} alt="edt" /></div><div class="dlt"><img src={trash} alt="dlt" /></div></div>
// <div class="user"><p> THE BATTLE IS CREATED BY THIS USER</p></div>
// <div class="col-sm-12 imgph"><h4>image</h4>
// <p>raffle battle raffle battle</p></div>
// <div class="textraff"><p><span>RAFFLE</span> ENDS IN  <img src={timeIcon} alt="time"  />   <span>01</span>H <span>34</span>MIN <span>28</span>S</p></div>
// <div class="col-sm-12 line1"> <p>TWITTER USER NAME OF WINNER APEARS HERE</p> </div>
// <div class="icon"> <img src={raffleLink} alt="link" /> GET RAFFLE LINK</div>
// <div class="col-sm-6 free"><p>free</p></div>
// <div class="col-sm-12 join"><p><span>JOIN</span> RAFFLE</p></div>

// </div> */}




	
 </section>	 
 
    
    )
  }
}
export class ButtonRender extends React.Component{
  constructor(props){
    super(props);
  }
  gotoTask(e){
    var ide=e.target.id

    this.props.prop.history.push(`/raffle/${ide}`)
    // this.props.router.push(`/raffle/${ide}`)
  }
  render(){
    return(
      <div>
    <button id={this.props.id} onClick={(e)=>this.gotoTask(e)}>Join Raffle</button>
    </div>
    )
  }
}
export class DataRender extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
      <div class="row box">
    <div class="col-md-3 col-sm-3 column">
	  
    <div class="heading3"><h3>{this.props.ob.BattleValue}</h3></div> 
<div class="edlt">	<div class="edt"><img src={editIcon} alt="edt" /></div><div class="dlt"><img src={trash} alt="dlt" /></div></div>
<div class="user"><p> THE BATTLE IS CREATED BY THIS USER</p></div>
<div class="col-sm-12 imgph"><h4>image</h4>
<p>raffle battle raffle battle</p></div>
<div class="textraff"><p><span>RAFFLE</span> ENDS IN  <img src={timeIcon} alt="time"  />   <span>01</span>H <span>34</span>MIN <span>28</span>S</p></div>
<div class="col-sm-12 line1"> <p style={{color:'white',fontSize:12}}>Winner:{this.props.ob.winnerName}</p> </div>
<div class="icon"> <img src={raffleLink} alt="link" /> GET RAFFLE LINK</div>
<div class="col-sm-6 free"><p>free</p></div>
<div class="col-sm-12 join"><p><span>JOIN</span> RAFFLE</p></div>

</div>
</div>

    </div>
    )
  }
}

