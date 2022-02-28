const scheduler = require("node-schedule");
var cheerio = require("cheerio");
var request = require("request");
var request = require("request");
require("dotenv").config(); // .env 파일에서 환경변수 불러오기
const accessToken = process.env.accessToken;
var headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: "Bearer " + accessToken,
};

// API url
//var url = "https://store.musinsa.com/app/goods/836816";
var url = "https://store.steampowered.com/search/?specials=1&ignore_preferences=1";
const schedule = scheduler.scheduleJob("*/5 * * * * *", function () {
  request(url, function (error, response, html) {
    if (error) {
      throw error;
    }

    var $ = cheerio.load(html);
    //var S = $("select#option1.option")[1];
    //var M = $(".option1 option")[2];
    //var L = $(".option1 option")[3];
    var XL = $("div.pagesubheader").text();
    //console.log(S)
    //console.log(M)
    //console.log(L)
    console.log("====");
    console.log(XL)
    //console.log(S.attribs.value + " " + S.attribs.jaego_yn);
    //console.log(M.attribs.value + " " + M.attribs.jaego_yn);
    //console.log(L.attribs.value + " " + L.attribs.jaego_yn);
    //console.log(XL.attribs.value + " " + XL.attribs.jaego_yn);
    if (XL=="All Products") {
        console.log(XL)
        var dataString = `template_object={
              "object_type": "text",
              "text": "XL 사이즈 품목이 재입고 되었습니다.",
              "link": {
                  "web_url": "https://developers.kakao.com",
                  "mobile_web_url": "https://developers.kakao.com"
              },
              "button_title": "바로 확인"
          }`;
  
        var options = {
          url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
          method: "POST",
          headers: headers,
          body: dataString,
        };
  
        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log("[XL 사이즈 품목이 재입고] 메시지 전송 완료.");
          } else {
              console.log("===",error,response.statusCode);
          }
        }
  
        request(options, callback);
  
        schedule.cancel();
      } else{
        console.log(XL)
        var dataString = `template_object={
              "object_type": "text",
              "text": "XL 사이즈 품절",
              "link": {
                  "web_url": "https://developers.kakao.com",
                  "mobile_web_url": "https://developers.kakao.com"
              },
              "button_title": "바로 확인"
          }`;
  
        var options = {
          url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
          method: "POST",
          headers: headers,
          body: dataString,
        };
  
        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("[XL 사이즈 품절] 메시지 전송 완료.");
          } else {
            console.log("not",error);
          }
        }
  
        request(options, callback);
      }
    /*if (XL.attribs.jaego_yn == "Y") {
        var dataString = `template_object={
              "object_type": "text",
              "text": "XL 사이즈 품목이 재입고 되었습니다.",
              "link": {
                  "web_url": "https://developers.kakao.com",
                  "mobile_web_url": "https://developers.kakao.com"
              },
              "button_title": "바로 확인"
          }`;
  
        var options = {
          url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
          method: "POST",
          headers: headers,
          body: dataString,
        };
  
        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("[XL 사이즈 품목이 재입고] 메시지 전송 완료.");
          } else {
            console.log(error);
          }
        }
  
        request(options, callback);
  
        schedule.cancel();
      } else if (XL.attribs.jaego_yn == "N") {
        var dataString = `template_object={
              "object_type": "text",
              "text": "XL 사이즈 품절",
              "link": {
                  "web_url": "https://developers.kakao.com",
                  "mobile_web_url": "https://developers.kakao.com"
              },
              "button_title": "바로 확인"
          }`;
  
        var options = {
          url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
          method: "POST",
          headers: headers,
          body: dataString,
        };
  
        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("[XL 사이즈 품절] 메시지 전송 완료.");
          } else {
            console.log(error);
          }
        }
  
        request(options, callback);
      }*/
    
  });
});