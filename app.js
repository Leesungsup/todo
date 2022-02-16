const express=require('express');
const app=express();
var port=3000;
let toDoLists=["밥먹기"]
app.set('view engine','pug');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.render('index',{toDoListTitle:'오늘의 할 일 : '+toDoLists.length,toDoLists:toDoLists})
})

app.post('/add_list',(req,res)=>{
    const newContent=req.body.content
    console.log(newContent+'추가')
    toDoLists.push(newContent)
    res.redirect('/')
})

app.get('/delete_list/:id',(req,res)=>{
    var content = req.params.id
    console.log(content+'삭제')
    toDoLists=toDoLists.filter((value)=> value!=content)
    res.redirect('/')
})

app.get('/open_update/:id',(req,res)=>{
    res.render('update',{prevContent:req.params.id})
})

app.post('/update_list',(req,res)=>{
    let origin_content=req.body.prevContent;
    let update_content=req.body.newContent;
    let index = toDoLists.indexOf(origin_content)
    toDoLists.splice(index,1,update_content)
    res.redirect('/')
})

app.listen(port,()=>{
    console.log('connected!')
})