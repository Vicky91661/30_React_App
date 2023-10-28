import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [search,setSearch ] = useState("");
  const [showElement , setShowElement] = useState("")
  const [start,setStart] = useState(true)

  const list = ["apple","orange","graps","pineapple","roten orange"]

  const match = (s) => {
    const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
    const re = RegExp(p);
    setShowElement(list.filter(v => v.match(re)));
  };


  useEffect(()=>{
    if(search.length===0)
    {
      setStart(true)
    }
    else{
      setStart(false)
    }
    
    match(search)
    console.log(showElement)
  }, [search])

  return (
    <>
      <input type='text' placeholder='search...' value={search} onChange={(e) => setSearch(e.target.value)} />
    {start?
      <div>
        
        {list.map((item) => {
          return (<p key={item}>{item}</p>)
        })}
      </div>
      
      
      :
      <div>
          {showElement.map((item) => {
            return (<p key={item}>{item}</p>)
          })}
      </div>
      }
      
    </>
  )
}

export default App
