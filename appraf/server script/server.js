var express = require('express');
var admin = require('firebase-admin');
const http = require("http");
const socketIo = require("socket.io");
var cors = require('cors')
// create an express app
var app = express();

var serviceAccount = require("./servicefirebase.json");
app.use(cors())
const server = http.createServer(app);
const io = socketIo(server);
var getApiAndEmit = "TODO"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://practice-6fb3e.firebaseio.com"
});

      var arr=[]
      var data=[]
      var endingDate=[]
    var db=admin.database()
      var RefTodb= db.ref().child('/raffles')
      RefTodb.on('child_added',(data)=>{
                arr.push(data.key)
      })
      // getApiAndEmit = (arrb)=>{
      //     arrb.forEach((valu)=>{
      //       var countDownDate = new Date(valu).getTime();
      //       // Get today's date and time
      //       var now = new Date().getTime();
          
      //       // Find the distance between now and the count down date
      //       var distance = countDownDate - now;
          
      //       // Time calculations for days, hours, minutes and seconds
      //       var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      //       var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      //       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      //       var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
      //       // Display the result in the element with id="demo"
      //        console.log(`${days} ${hours} ${minutes} ${seconds}`)
            
      //       // If the count down is finished, write some text
      //       if (distance < 0) {
      //         clearInterval(x);
      //       }
      //       // socket.emit("Fromfirebase", `${days} ${hours} ${minutes} ${seconds}`);
           
      //     })
      // }
      setTimeout(()=>{
            arr.forEach((value)=>{
                var dataRef= RefTodb.child(value)
                dataRef.on('value',(snapshot)=>{
                      var a= snapshot.val()
                      endingDate.push(a.EndingTime)

                           io.on("connection", socket => {
        console.log("New client connected"), setInterval(
          () =>{
        endingDate.forEach((valu)=>{
          var countDownDate = new Date(valu).getTime();
          // Get today's date and time
          var now = new Date().getTime();
        
          // Find the distance between now and the count down date
          var distance = countDownDate - now;
        
          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
          // Display the result in the element with id="demo"
           console.log(`${days} ${hours} ${minutes} ${seconds}`)
          
          // If the count down is finished, write some text
          if (distance < 0) {
            console.log('123')
          }
          socket.emit("Fromfirebase", `${days} ${hours} ${minutes} ${seconds}`);
         
        })
    },
          1000
        );
        socket.on("disconnect", () => console.log("Client disconnected"));
      });
                })
            })
      },5000)
  
    
app.listen(8000)
// send a message
console.log('Server has started!');
