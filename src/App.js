
import './App.css';
import bolb from './images/blob.png'
import bolb2 from './images/blob2.png'
import React from 'react'
import Questions from './Questions';
function App() {
  const [quiz,setquiz]=React.useState(false)
  return (
  
    <main>
      {
   quiz?
    <div>
     <img className='bolb' src={bolb}></img>
     <img className='bolb2' src={bolb2}></img>
    <div className='Begin'>
    <h1>Quizzical</h1>
    <p className='description'>Some description if needed</p>
    <button>Start Quiz</button>
    </div>
    </div>
    :
    <div>
       <img className='bolb' src={bolb}></img>
       <img className='bolb2' src={bolb2}></img>
      <div className='form'>
      <Questions />
      </div>
    </div>
}

    </main>
  )
}

export default App;
