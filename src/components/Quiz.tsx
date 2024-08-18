import React, { useState } from 'react'

type Question = {
  question: string
  options: string[]
  answer: number
}

const quizQuestions: Question[] = [
  {
    question: '¿Cuál es el idioma más hablado en el mundo?',
    options: ['Inglés', 'Mandarín', 'Español', 'Hindi'],
    answer: 1
  }
  // Añade las demás preguntas aquí...
]

export const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerOptionClick = (index: number) => {
    if (index === quizQuestions[currentQuestion].answer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedOption(null)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Tu puntuación es {score} de {quizQuestions.length}
            </h2>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">
                {quizQuestions[currentQuestion].question}
              </h3>
            </div>
            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-2 text-left rounded-lg ${
                    selectedOption === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => handleAnswerOptionClick(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
