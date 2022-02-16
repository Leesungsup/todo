var express=require('express');
var router=express.Router();
router.get('/',(req,res)=>{
    res.render('index', { title: '간단한 ToDo 리스트 예제 실습' });
})
module.export=router;