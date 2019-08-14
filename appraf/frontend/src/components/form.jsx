import React from 'react'
import './../App.css'
import twitterIcon from './../icons8-twitter-16.png'
import Datdrop from './../IconLogo.png'
import YoutubeImg from './../icons8-youtube-16.png'
import TimePicker from 'react-time-picker'
import firebase from 'firebase'
export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            battleValue:"",
            battleURL:'',
            battleEmpty:false,
            battleError:"Battle URL can't be empty",
            datdropLink:'',
            CsgoEmpireLink:'',
            primeUnboxLink:'',
            tripleLinkEmpty:false,
            MessageBox:'AtLeast Put One Of the Link Which can be datdrop OR CsgoEmpire OR PrimeUnbox',
            datdropBut:false,
            CsGoBut:false,
            PrimelinkBut:false,
            fileUpload:{},
            filnam:'',
            downURL:'',
            time:'',
            dates:''
        }
      }
      submitForm(e){
    e.preventDefault()
 if(this.state.datdropLink===""&&this.state.CsgoEmpireLink===""&&this.state.primeUnboxLink===""){
     this.setState({
         tripleLinkEmpty:true
     })
    
 }
 else{
     this.setState({
         tripleLinkEmpty:false
     })
     if(this.state.battleURL===""){
         this.setState({
             battleEmpty:true
         })
     }
     else{
         this.setState({
             battleEmpty:false
         })
         var storageRef = firebase.storage().ref();

         // setTimeout(this.getItemLocally,5000)
         // Create a reference to 'images/mountains.jpg'
         var reftosave = storageRef.child('Raffleimages/'+this.state.filnam+'.jpg');
         reftosave.put(this.state.fileUpload).then((snapshot)=> {
             reftosave.getDownloadURL().then((url) =>{
               this.setState({
                   downURL:url
               })
               console.log('Uploaded a blob or file!');
               console.log(this.state.downURL)
                 // localStorage.setItem('URL',url)
            }).catch(function(error) {
              // Handle any errors
            });
          
            
           });
           setTimeout(()=>{
               var datref=firebase.database().ref().child('/raffles')
               var obj={
                   BattleValue:this.state.battleValue,
                   BattleUrl:this.state.battleURL,
                   datDropUrl:this.state.datdropLink,
                   primeLinkUrl:this.state.primeUnboxLink,
                CsGoUUrl:this.state.CsgoEmpireLink,
                StartingDate:Date.now(),
                winnerName:'',
                raffleHost:'',
                participants:['hamxa1331','taha234'],
                EndingTime:`${this.state.dates} ${this.state.time}`,
                imageName:this.state.filnam,
                imageURL:this.state.downURL
               }
                datref.push(obj)
                console.log('done')
           },15000)
     }
 }
      }
      takeDate(e){
        var date=e.target.value
        var dat=(date.split('-'))
        console.log(dat)
         this.setState({
           dates:`${dat[1]} ${dat[2]} ${dat[0]}`
         })
      }
      onChange =(time)=>{
            var tim=`${time}:25`
       this.setState({
         time:tim
       })
      }
      onChangetext(e){
          
        this.setState({
            [e.target.name]:e.target.value
        })
      }
      imageUpload(e){
        var file= e.target.files[0]
        var filenam=file.name
        var finame=filenam.split(".")
        var rand= Math.floor(Math.random() * 10000);
        console.log(rand) 
        var fname=finame[0]+rand
        console.log(typeof(fname))
        this.setState({
               fileUpload:file,
               filnam:fname
           })
      }
    render(){
        return(
            <div>
                <header >
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
    <div class="col-sm-2">
      
    </div>
    <div class="col formmain">
	<div class="createraffle"> <h3>CREATE <span>RAFFLE</span></h3></div>
	<div class="container">
 <form>
   <p> <label for="battlevalue">BATTLE VALUE</label></p>
    <p><input type="text" id="battlevalue" onChange={(e)=>this.onChangetext(e)} name="battleValue"/></p>

    <p><label for="runningtime">RAFFLE ENDING TIME</label></p>
    <div class="runtime">
	<input type="date" onChange={(e)=>this.takeDate(e)}/>
        <TimePicker
          onChange={this.onChange}
        />
	
	</div>
	
	<p><label for="datdropraffle">DATDROP RAFFLE LINK</label></p>
    <p><input type="text" id="datdropraffle" name="datdropLink" onChange={(e)=>this.onChangetext(e)}/></p>
	
	<p><label for="primeunboxraffle">PRIMEUNBOX RAFFLE LINK</label></p>
    <p><input type="text" id="primeunboxraffle" name="primeUnboxLink" onChange={(e)=>this.onChangetext(e)}/></p>
	
	<p><label for="csgoempire">CSGOEMPIRE RAFFLE LINK</label></p>
    <p><input type="text" id="runningtime" name="CsgoEmpireLink" onChange={(e)=>this.onChangetext(e)} /></p>
	
	<p><label for="battleurl">BATTLE URL</label></p>
    <p><input type="text" id="battleurl" name="battleURL" onChange={(e)=>this.onChangetext(e)}/></p>
    {/* {this.validator.message('battleURL', this.state.battleURL, 'required','text-danger')} */}
    {this.state.battleEmpty && <div style={{color:'white'}}>{this.state.battleError}</div>}
	<p><label for="raffleimg">RAFFLE IMAGE</label></p>
<div class="upload"><div class="upbtn"><input type="file" accept="/image" onChange={(e)=>this.imageUpload(e)}></input></div></div>
	
	<div class="container">
  <div class="row justify-content-md-center">
    <div class="col">
    {this.state.tripleLinkEmpty && <div style={{color:'white',fontSize:14}}>{this.state.MessageBox}</div>}
    </div>
    <div class="col-sm-4">
	<div class="flex-container">
	 <div class="raff"><a onClick={(e)=>this.submitForm(e)}><span>CREATE</span> RAFFLE</a></div>
</div>
	
    </div>
    <div class="col">
    </div>
  </div>
  </div>
	
	
	</form>
</div>
	
    </div>
    <div class="col-sm-2">
     
    </div>
  </div>
  </div>
  
            </div>
        )
    }
}