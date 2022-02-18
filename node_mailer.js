const nodemailer=require('nodemailer');
const email =require('./email');
const send = async(data)=>{
    nodemailer.createTransport(email).sendMail(data,function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
            return info.response
        }
    });
};
const content={
    from:"",
    to:"",
    subject:"nodemailer",
    text:"nodemailer 연습"
}
send(content);