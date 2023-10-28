import React, { useState } from 'react'
import "./Style.css"
import { Questions } from './api/question'

function Accordion() {
    const data=Questions;
    const [show ,setShow]=useState({})

    const showAnswer=(e)=>{
        const id = e.target.getAttribute("lundid")
        console.log(id)
        setShow((prev)=>({...prev,[id]:!prev[id]}))
    }
  return (
    <div className='accordion'>
        <section>
            <h1>FAQ</h1>
            {
                data.map((question)=>
                    <div key={question.id}>
                        <h3 onClick={showAnswer} lundid={question.id}>{show[question.id] ? "❌" : "✅"}{question.answer} </h3>
                        {show[question.id] && <p>{question.answer}</p>}
                    </div>
                )
            }
        </section>
    </div>
  )
}

export default Accordion