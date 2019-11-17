//EchoAPI is the best successful for LineMessageAPI test
//scan QRCode to add Linebot friend with you

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var msg_list = ['today events', 'tomorrow events'];

const weeklyevents = require('./data-weeklyevents')

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text

    let msg_return = [];

    if(msg == "assistant"){

      msg_el = {type: 'text', text: "Hello Sir, You can check your events for today and tomorrow by asking me 'today events' and 'tomorrow events'." };
      msg_return.push(msg_el);

      reply(reply_token, msg, msg_return)
    }
    else if(msg_list.indexOf(msg) >= 0){

      

      if(msg == 'today events'){
         var d = new Date();
         var n = d.getDay();
         var td_wk = d.toString().split(' ').splice(0,1).join(' ');
         var td_date = d.toString().split(' ').splice(1,3).join(' ');
         var date_txt = td_wk+', '+td_date;

         msg_el = {type: 'text', text: 'Please note that today events on '+date_txt +':' };
         msg_return.push(msg_el);
      }
      else if(msg == 'tomorrow events'){
         var d = new Date();
         d.setDate(d.getDate()+1);
         var n = d.getDay();
         var td_wk = d.toString().split(' ').splice(0,1).join(' ');
         var td_date = d.toString().split(' ').splice(1,3).join(' ');
         var date_txt = td_wk+', '+td_date;

         msg_el = {type: 'text', text: 'Please note that tomorrow events on '+date_txt +':' };
         msg_return.push(msg_el);
      }

      var count = 0;
      for(var i = 0;i< weeklyevents.length; i++)
      {
         if(weeklyevents[i].dayofweek == n){
            count++;
            msg_el = {type: 'text', text: '('+count+') '+ weeklyevents[i].event };
            msg_return.push(msg_el);
         }
      }

      reply(reply_token, msg, msg_return)
    }

    res.sendStatus(200)
})

app.listen(port)

function reply(reply_token, msg, msg_return) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {9+RXV2ysT3OFRIj+KQdJKhM8S1jTlst76Ofr37tWpX8uhM6WmpuOSj1AXh9YhOVqJ3uAvpwN4rhxjkdcXcvey9OQuS/QVc8W9+Otlu11UP6NjaYlQgs9AXPIZNu3elUcFHt4fRIPy48qK09PCeMA9gdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: msg_return
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

