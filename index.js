var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var bot = linebot({
  channelId: '1531674551',
  channelSecret: '91cb71fb33d5de79cc5b07ab647697c0',
  channelAccessToken: '7+xsOVJ5Lh1T7g/he3gkbGpkpZbgR9UkTz+Ev9k1AQZKGqhnD6VHprn5AeAcswJfTgmuPHCrXvWcxhqpTD+uY8W8o2JS+ScNhmF69o+pk3V0iW+QSskLCcsxW0CqjP3wgyMtVPQ8XKUfQ5Dn8wTcSwdB04t89/1O/w1cDnyilFU='
});
var app = express();
var linebotParser = bot.parser();
app.post('/', linebotParser);

// 因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port: ", port);
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

var timer;
// _getJSON();
// _repeat();
number();

// setTimeout(function() {
//     var userId = event.message.id;
//     var sendMsg = '要發送的文字';
//     bot.push(userId,sendMsg);
//     console.log('send: '+sendMsg);
// }, 5000);

function _repeat() {
  bot.on('message', function(event) {
    if (event.message.type = 'text') {
      var msg = event.message.text;
      event.reply(msg).then(function(data) {
        // success 
        console.log(msg);
      }).catch(function(error) {
        // error 
        console.log('error');
      });
    }
  });
}

function number() {
  bot.on('message', function(event) {
    if (event.message.type = 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      var request = new XMLHttpRequest();
      request.open('POST', 'https://www.taiwanfundexchange.com.tw/TFEFrontend/qaQuery', true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send('queryText='+msg);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var resp = request.responseText;
          console.log('response: \n'+resp);
          // var array = resp.qaDataList;
          // console.log('array:\n '+array);
          if(resp) {
            resp.forEach(function(entryIndex, entry) {
              console.log(entry.topic, entry.content);
            });
          }

          // if (msg.indexOf('1\r') != -1) {
          //     replyMsg = 'dfafsdfsdfsa';
          //   if (replyMsg == '') {
          //     replyMsg = 'Morning! How can I help u? (cony kiss)\n參加前注意事項 => 1\n加入競標組合 => 2\n\nThanks, have a good day! (halloween)';
          //   }
          // }
          // if (replyMsg == '') {
          //   replyMsg = 'Morning! How can I help u? (cony kiss)\n如何加入會員 => 1\n如何加入加入 => 2\n\nThanks, have a good day! (halloween)';
          // }

          // event.reply(replyMsg).then(function(data) {
          //   console.log(replyMsg);
          // }).catch(function(error) {
          //   console.log('error');
          // });

        } else {
          // We reached our target server, but it returned an error
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };
    }
  });
}


function _getJSON() {
  clearTimeout(timer);
  getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
    response.forEach(function(e, i) {
      pm[i] = [];
      pm[i][0] = e.SiteName;
      pm[i][1] = e['PM2.5'] * 1;
      pm[i][2] = e.PM10 * 1;
    });
  });
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}