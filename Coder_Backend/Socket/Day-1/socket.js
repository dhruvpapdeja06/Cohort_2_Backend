
const express = require('express');
const app = express();

const Server = require("socket.io");
const http = require('http');

const server = http.createServer(app);


// I have created a server with express. Then have to upgrade 
// const server = app.listen(3000,()=>{
//     console.log("Server is running on Port : 3000");
// })

// socket rqst handle by io
const io = new Server(server);

// anything instead of socket , how it which user is connected , buy socket.id know about how rqst
io.on('connection',(socket)=>{
    console.log("Socker connected");


    socket.on('message',(data)=>{
        io.emit('new-message',data); //group chat 
    })

    socket.on('diconnect',()=>{
        console.log("Disconnect from the server");
    })
})

// original way create 
server.listen(3000,()=>{
    console.log("Listen");
})

//If mulitple socket then how access particular specific


// We have attach it later there is possiblity that rqst come frontend then not attach then we don't use it.

// we can use our server for normal work.

// Here we create the server with express , and the socket functionlity , handle by soket.io 




/*

WebSocket --> 
1. Real-time Chat 
2. Notification


Example of Cricbuzz 

Frontend   --------------->  Rqst            Server
          Res ---------------    Score

    Without reload the page score update on UI.

    In HTTP we have to rqst then get the response.

    // Like in Drink break after 5 sec you rqst then no change in response 

    --> here rqst is increase , chance of server failure --> API call waste.
    --> I want that i don't to call again and again , when update in score then server give back to me.

    Same for chat application.

    In HTTP server don't rqst to user ,to give the response until user rqst it .



    A  user                       server                              B User 
    crush seen but not   ----->         <----------------------rqst new msg come wait , again and again
    reply
    
    
    In stock price is updated in ms, like zerodha give to push you when update.
    Dream 11 team your ranking is updated , otherwise server is crash.

    // Going to depth 

    Tradtional System.
                         http 1.0
    Client        ---------------------------------------->      Server 
                        connection established  --> Tcp --> 3-way hand-shake

                        sync 
                        sync - ack
                        ack
        before sending the msg check server is available then start transfer the msg.

msg --> travel in pkts.In sync is also give you the pkt number , In each pkt no is given at server side arrange 
get the meaning.

When data goes to different pkt routes, there is possibilty then pkt not reach of order, then how to out of order
pkt can arrange.

ACK : 111
SYNC :  500
ACK : 112
SYNC : 501

When connection is established so, in Header it will send the ip address, port no , msg , DIP.

After connection now actuall msg is sent.
Now after exchanging the msg , then connection break and delete all the data.

How conncection break? --> TCP terdown
4 way handshake --> 
1. Server told sent the data
2. Ack get the msg
3. Ok break connection
4. done. 


HTTP 1.1

1. In this it established the connection after one msg, --> connection maintain .
2. After rqst then server response.
3. Here client / server initate to break the connection. when it's breakdown , if both of them not break, 
in nodejs we have rule , after time it break;

How Websocket implement--> 

1. People think how chat application make where server can msg it. with only http method.
2. Before 1. API call

// Optimize when server has new msg then it revert to me.

// poling --> rqst again and agin on server.

Long Poling --> Rqst server , server hold for some sec , unitl get hte msg to user B.
After some time then sent to userA.

then UserA again sent it. then it hold then when get msg B then response.

// Load on server, resources consumption.

// Solution Streaming --> Server side chunking 

-->Data will be sent on chunking.

--> It facility come in 1.1 version of HTTP.
 --> response in straming or chunking 

 --> Possibilty of data lose then not display the msg , then re-transmit of it.
 Data come in Network layer,

 How client sent the signal pkt , that pkt lose.
 Then previous one rqst pause in the previous one , then use on halt.

 (Like Unidirectional )


 ,Now Websocket 

 1. You have to create an TCP conncetion 
 2. Here server without rqst then able to send the pkg.
 3. After making the conncetion then upgrade to websocket conncetion.

 4. BOth have Ip address and port no .
 5. Conccetion is bi-directional --> 2-way handshake. 

 6. WebSocket on the built of TCP.
 7. 


 The road to websocket.org then what is socket.io

// we can do with the websocket --> but use socket.io is a library the build on top of it

 In socket is give you advantage , easily way to write code , 

 1. Advantage --> some browser in earlier not support it .
 2. Firewall --> Websocket is disable , but your application build on websocket around then it not work then 
 it give you the flexibility , if browser not support then it convert it into long poling , lok like bi-directional.


 React about WebTransport 

 1. If client and server is no talking to each other. in websocket on the top of it i have to check it 
 server is sending the msg , client is leave it and here resources is consume.

 --> In between it will sent the ping cmd , to check it alive.

 --> If by chance client offline due to network issue, and some pkt lost, but socket.io give the ack , store in quere
 and give to it.



*/