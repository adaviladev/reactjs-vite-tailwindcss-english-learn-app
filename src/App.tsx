import React from 'react'
import { Quiz } from './components/Quiz'
import ReactConfetti from 'react-confetti'

const App: React.FC = () => {
  return (
    <div>
      <Quiz />
      <ReactConfetti />
    </div>
  )
}

export default App
