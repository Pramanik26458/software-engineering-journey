const express=require('express');


const app= express(); // server has created
app.get('/',(req,res)=>{
    res.send('Hello World');

}) // route created

app.get('/about',(req,res)=>{
    res.send('This is about page');
}) // route created

app.get('/contact',(req,res)=>{
    res.send('This is contact page');
}) // route created

app.listen(3000) // server start 