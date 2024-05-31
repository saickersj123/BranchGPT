import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; // React 훅인 useState를 불러옴

function App() {

  let logo = '배고프다';
  let [글제목,b]=useState(['아 일본가서 맛있는거 쉴틈없이 먹고 싶다','아 우동 먹고싶다','겐로쿠 우동 또 가고 싶다'])
  let [따봉,따봉변경]=useState(0);
  // useState 훅을 사용하여 따봉 상태와 그 상태를 변경하는 함수를 정의함


  // let num = [1,2];

  // let [a,c]= [1,2]

  // let a = num[0];
  // let c = num[1];
  return (
    <div className="App">
       <div class="black-nav">
        <h4>{logo}</h4>
       </div>
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
    </div>
    
  );
}

export default App;
