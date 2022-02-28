const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
require('dotenv').config();

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.use(session({
    secret:'ras',
    resave:true,
    secure:false,
    saveUninitialized:false,
}))

const e_clientID = process.env.clientID;
const e_clientSecret = process.env.clientSecret;
const e_redirect_uri = process.env.redirectUri;
const kakao={
    clientID:e_clientID,
    clientSecret:e_clientSecret,
    redirectUri:e_redirect_uri
}

app.get('/auth',(req,res)=>{
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code`;
    console.log(kakaoAuthURL);
    res.redirect(kakaoAuthURL);
})

app.get('/auth/callback', async(req,res)=>{
    //axios>>promise object
    try{//access토큰을 받기 위한 코드
        token = await axios({
            //token
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:qs.stringify({
                grant_type: 'authorization_code',//특정 스트링
                client_id:kakao.clientID,
                client_secret:kakao.clientSecret,
                redirectUri:kakao.redirectUri,
                code:req.query.code,//결과값을 반환했다. 안됐다.
            })//객체를 string 으로 변환
        })
    }catch(err){
        res.json(err.data);
    }
    let user;
    try{
        console.log(token);//access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
        user = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${token.data.access_token}`
            }//헤더에 내용을 보고 보내주겠다.
        })
    }catch(e){
        res.json(e.data);
    }
    console.log(user);
    req.session.kakao = user.data;
    //req.session = {['kakao'] : user.data};
    console.log('success');
    res.send('success');
})
app.get('/auth/info',(req,res)=>{
    //let {nickname,profile_image}=req.session.kakao.properties;
    let {nickname}=req.session.kakao.properties;
    res.render('info',{
        nickname,//profile_image,
    })
})
 
 
app.get('/',(req,res)=>{ 
    res.render('index');
});
 
app.get(kakao.redirectUri)
 
app.listen(3000, ()=>{
    console.log(`server start 3000`);
})