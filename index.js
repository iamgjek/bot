var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: 1531674551,
  channelSecret: 91cb71fb33d5de79cc5b07ab647697c0,
  channelAccessToken: 7+xsOVJ5Lh1T7g/he3gkbGpkpZbgR9UkTz+Ev9k1AQZKGqhnD6VHprn5AeAcswJfTgmuPHCrXvWcxhqpTD+uY8W8o2JS+ScNhmF69o+pk3V0iW+QSskLCcsxW0CqjP3wgyMtVPQ8XKUfQ5Dn8wTcSwdB04t89/1O/w1cDnyilFU=
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});