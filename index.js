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

// bot.on('message', function(event) {
//   console.log(event); //把收到訊息的 event 印出來看看
// });

// var timer;
// _getJSON();
number();

// setTimeout(function() {
//     var userId = event.message.id;
//     var sendMsg = '要發送的文字';
//     bot.push(userId,sendMsg);
//     console.log('send: '+sendMsg);
// }, 5000);

function number() {
  bot.on('message', function(event) {
    var replyMsg = '';
    if (event.message.type = 'text') {
      var msg = event.message.text;
      var request = new XMLHttpRequest();
      var rUrl = 'https://www.taiwanfundexchange.com.tw/TFEFrontend/qa?queryText=';
      var newArray = [];
      var tmp_carousel = 
      {
        "type": "template",
        "altText": "主畫面",
        "template": {
            "type": "carousel",
            "columns": [
                {
                  "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
                  "title": "TFE去中心化AI機器人",
                  "text": "...",
                  "actions": [
                      {
                          "type": "uri",
                          "label": "投資3步驟",
                          "uri": "https://www.taiwanfundexchange.com.tw/TFEFrontend/resource/edm/newbie/investor.html"
                      },
                      {
                          "type": "uri",
                          "label": "加入會員",
                          "uri": "https://www.taiwanfundexchange.com.tw/TFEFrontend/register?utm_source=linebot&utm_campaign=linebot&utm_medium=carousel"
                      }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
                  "title": "常見問題",
                  "text": "description",
                  "actions": [
                      {
                          "type": "postback",
                          "label": "什麼是信用額度？",
                          "data": "action=信用額度&itemid=101"
                      }
                  ]
                }
            ]
        }
      };
      var tmp_button = 
      {
        "type": "template",
        "altText": "Call to action",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "title": "Call to action",
            "text": "Please select",
            "actions": [
                {
                  "type": "postback",
                  "label": "Add to cart",
                  "data": "action=add&itemid=123"
                }
            ]
        }
      };
      request.open('POST', 'https://www.taiwanfundexchange.com.tw/TFEFrontend/qaQuery', true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send('queryText='+msg);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          // var resp = request.responseText;
          var resp = JSON.parse(request.responseText);
          // console.log('response: \n'+resp);
          var array = resp.qaDataList;

          if (msg.indexOf('1') != -1 || msg.indexOf('主畫面') != -1 || msg.indexOf('主選單') != -1) {
            replyMsg = tmp_carousel;
          } else if (msg.indexOf('2') != -1) {
            replyMsg = tmp_button;
          } else if (msg.indexOf('hello') != -1 || msg.indexOf('hi') != -1 || msg.indexOf('Hello') != -1 || msg.indexOf('Hi') != -1 || msg.indexOf('哪位') != -1 || msg.indexOf('說話') != -1 || msg.indexOf('嗎') != -1) {
            replyMsg = '請不要跟機器人聊天，以免影響工作效率... 要把妹去去去～';
          } else if (msg.indexOf('TFE') != -1 || msg.indexOf('tfe') != -1 || msg.indexOf('Tfe') != -1) {
            replyMsg = 'TFE台灣資金交易所－標會型P2P借貸！\n大幅改良流傳千年的民間「標會」機制，使用者在平台可以自主決定借款利率，解決了當今網路金融直接存借的問題。除此之外，使用者投資，建立信用等人生各階段金融需求皆可在平台上滿足，開創傳統銀行之外的另一個新選擇。\n立即前往 >> http://tfe.tw';
          } else if (msg.indexOf('我要') != -1 ) {
            replyMsg = '要你個大頭啦～\n\n請輸入關鍵字，建議用單詞來進行搜尋，例如：開標、信用額度等等';
          } else if (msg.indexOf('我想') != -1 ) {
            replyMsg = '想你鬼啦～\n\n請輸入關鍵字，建議用單詞來進行搜尋，例如：開標、信用額度等等';
          } else if (array) {
            // console.log('array: '+array.length);
            for (var i = 0; i < array.length; i++) {
              newArray[i] = ' '+array[i].topic+' '+rUrl+array[i].topic+'\n\n';
            }
            replyMsg = '你要找的關鍵字為 " '+msg+' "...\n去中心化AI機器人比對的結果，推薦給您：\n\n'+newArray;
          } else {
            newArray = '拍謝厚！這API只能精準搜尋，不支持模糊比對\n建議用單詞來進行搜尋，例如：開標、信用額度等等...\n\n我知道很爛啦，就別嫌了XDD';
            replyMsg = newArray;
          }

        } else {
          // We reached our target server, but it returned an error
          replyMsg = '親～連線好像有點問題，請稍後再試！';
        }
        event.reply(replyMsg).then(function(data) {
          console.log(replyMsg);
        }).catch(function(error) {
          console.log('error');
        });
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };
    }
  });
}


// function _getJSON() {
//   clearTimeout(timer);
//   getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
//     response.forEach(function(e, i) {
//       pm[i] = [];
//       pm[i][0] = e.SiteName;
//       pm[i][1] = e['PM2.5'] * 1;
//       pm[i][2] = e.PM10 * 1;
//     });
//   });
//   timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
// }