import React from 'react'
import './questions.css'

export default function Questions(questions) {
  function color(answer, showResults) {
    let backgroundColor = '';
 
  
    if (showResults) {
      if (answer.checked) {
        backgroundColor = answer.correct ? '#6aa84f' : 'red'; 
        
      } else if (!answer.checked && answer.correct) {
        backgroundColor = '#6aa84f';
     
      }

    }
   
    return backgroundColor;
  }
  return (
    <div className='Question'>
    <h3>{questions.question}</h3>
    <div className='questions-layout'>
      
    {questions.Answers.map((item=>{
        return <button key={item.id} style={{backgroundColor:color(item,questions.showResults)}} onClick={()=>{questions.HandleAnswer(item.id,item.question_id)}}
         className={item.checked?'over':'options'} >{item.text}</button>
    }))}
   
    
    
     </div>
     <hr />
     
  
    </div>
  )

}