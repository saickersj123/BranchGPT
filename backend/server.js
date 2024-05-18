
//express 라이브러리 기능을 사용하겠다
const express = require('express');
const app = express();

//mongodb 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kiho1114:DwTQtfGW0D5o6eza@cluster0.nn0mnr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>
console.log('연결 성공')).catch(()=>console.log('실패'))

app.listen(4000, function(){
   console.log('listening on 4000' )
});


//응답 요청 연습 및 html 문서 응답 확인
app.get('/kiho', function(요청, 응답){
    응답.send('제이름은 김기호입니다.')
});
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html')
});