import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let logo = '배고프다';
  let [글제목,글제목변경]=useState(['아 일본가서 맛있는거 쉴틈없이 먹고 싶다','아 우동 먹고싶다','겐로쿠 우동 또 가고 싶다'])
  let [따봉,따봉변경]=useState(0);



  // let num = [1,2];

  // let [a,c]= [1,2]

  // let a = num[0];
  // let c = num[1];
  return (
    <div className="App">
       <div class="black-nav">
        <h4>{logo}</h4>
       </div>

       <button onClick={()=>{

         let copy = [...글제목];
         copy[0]='여자코트 추천';
         글제목변경(copy);
       }}>글수정</button>


      <div class="list">
        <h4>{글제목[0]} <span onClick={()=>{따봉변경(따봉+1) }}>ദ്ദി´ ▽ ` </span> 
        {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>
      
      <div class="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      
      <div class="list">
        <h4>{글제목[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className= "modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
      {/* <Modal></Modal> */}




    </div>
    
  );
}
// let Modal = () => {}


// function Modal(){
//   return (
//     <div className= "modal">
//         <h4>제목</h4>
//         <p>날짜</p>
//         <p>상세내용</p>
//     </div>
//   )
// }

export default App;
