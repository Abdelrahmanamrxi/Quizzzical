
import './App.css';
import './questions.css'
import bolb from './images/blob.png'
import bolb2 from './images/blob2.png'
import React from 'react'
import Questions from './Questions';
function App() {
  const [questions,set_questions]=React.useState([])

  const [quiz_page,setquiz]=React.useState(true)
  const [isResultChecked,setResultChecked]=React.useState(false)
  const[correct,set_correct]=React.useState(false)
  
  async function Fetch(){
    const response=await fetch('https://the-trivia-api.com/v2/questions')
    const data=await response.json();
    
   
    const modifiedData = data.map(question => {
    
      let answers = [
        ...question.incorrectAnswers.map(answer => {
          return { text: answer, id: Math.floor(Math.random() * 200000), checked: false ,question_id:question.id,correct:false};
        }),
        { text: question.correctAnswer, id: Math.floor(Math.random() * 200000), checked: false,question_id:question.id,correct:true }
      ];

      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }

      return { ...question, answers };
    });

    set_questions(modifiedData);
  }

  React.useEffect(() => {
    
    Fetch();
      
     
    },[])

    function HandleAnswer (answerId, questionId)  {
      if (isResultChecked) return;
      set_questions(prevQuestions =>
        prevQuestions.map(question => {
          if (question.id === questionId) {
        
            const updatedAnswers = question.answers.map(answer => ({
              ...answer,
              checked: answer.id === answerId

              
              
            }));
            return { ...question, answers: updatedAnswers };
          }
          return question;
        })
      );
      
    };

function flipPage(){
  setquiz(!quiz_page)
}

function Endgame() {
  if (isResultChecked) {
  Fetch();
  
    setResultChecked(false);
    setquiz(true);
  } else {
  
    setResultChecked(true);
  }
}

  return (

    <main>
      {
   quiz_page?
    <div>
     <img className='bolb' src={bolb}></img>
     <img className='bolbe2' src={bolb2}></img>
    <div className='Begin'>
    <h1>Quizzical</h1>
    <p className='description'>Some description if needed</p>
    <button onClick={flipPage} className='start'>Start Quiz</button>
    </div>
    </div>
    :
    <div>
       <img className='bolb'  src={bolb}></img>
      
      <div className='form'>
      {questions.map((item)=>{
        return <Questions key={questions.id} question={item.question.text}
        Answers={item.answers}
        id={item.answers.id}
        answerid={item.id}
        HandleAnswer={HandleAnswer}
        checked={item.answers.checked}
        correct={correct}
        showResults={isResultChecked}
        correctAnswer={item.correctAnswer}
        

     
        />
      })}
     <button onClick={Endgame} className='End'>{isResultChecked?'Play Again':'Check Results'}</button>

    
      </div>
   
    </div>
}

    </main>
  )
}

export default App;
