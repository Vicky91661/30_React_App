import { useState, useEffect } from 'react'
import "../public/alarm.mp3"

import './App.css'

function App() {
  const [allalarm, setAllAlarm] = useState([])
  const [alarm, setAlarm] = useState("") 
  const [start,setStart] =useState(false)
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  // const [snooz,setSnooz]=([])

  const alarmSound = new Audio('../public/alarm.mp3');
  //alarmSound.play() 

  

  setInterval(()=>{
    setTime(new Date().toLocaleTimeString())
  },1000)

  const addalarm=()=>{
    setStart(true)
  }
  const submitAlarm=()=>{
    setStart(false)
    if(alarm){
      setAlarm(String(alarm))
      const nalm = "January 1, 1980 " + alarm;
      const newAlarm = new Date(nalm);
      if (!isNaN(newAlarm)) {
        console.log("inside", newAlarm)
        const hour = newAlarm.getHours();
        const min = newAlarm.getMinutes();
        const sec = newAlarm.getSeconds();
        const set = hour >= 12 ? 'PM' : 'AM';

        setAllAlarm((prev) => [
          ...prev,
          {
            hour,
            min,
            sec,
            set,
          },
        ]);
      }

      setAlarm('');
    }
    
    
      allalarm.map((e) => {
        console.log("hey")
        console.log(e)
      })
  
  }
  const deleteAlarm=(index)=>{
    setAllAlarm((prev)=>prev.filter((_,i)=>i!==index))
  }

  const checkAlarmTime = () => {
    allalarm.forEach((e,index) => {
      if (e.hour === new Date().getHours() && e.min === new Date().getMinutes()) {
        // setSnooz(index);
        playAlarmSound();
      }
    });
  };

  const playAlarmSound = () => {
    alarmSound.play();
  };

  useEffect(() => {
    // Check if it's time to sound the alarm when allalarm or time changes
    checkAlarmTime();
  }, [allalarm, time]);

  return (
    <>
      <h1>{time}</h1>
      <button onClick={addalarm}>➕ Add  Alarm</button>
      
      {start ? 
      <div>
        <input value={alarm} onChange={(e)=>setAlarm(e.target.value)}/> 
          <button onClick={submitAlarm}>➕</button>
      </div>:
      null}
      {allalarm.map((e,index)=>(
        <h2 key={index}>{e.hour}:{e.min} {e.set} <button className='crossButton' onClick={()=>deleteAlarm(index)}>❌</button></h2>
      ))}
      
    </>
  )
}

export default App
