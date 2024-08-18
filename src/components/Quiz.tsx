import React, { useState } from 'react'

type Question = {
  question: string
  options: string[]
  answer: number
}

const quizQuestions: Question[] = [
  {
    question: '¿Cuál es el idioma más hablado en el mundo?',
    options: ['Inglés', 'Mandarín', 'Español'],
    answer: 1
  },
  {
    question: '¿En qué año llegó el hombre a la luna?',
    options: ['1965', '1969', '1972'],
    answer: 1
  },
  {
    question: '¿Cuál es el planeta conocido como el planeta rojo?',
    options: ['Venus', 'Marte', 'Júpiter'],
    answer: 1
  }
  // Añade más preguntas aquí
]

export const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
    if (index === quizQuestions[currentQuestion].answer) {
      setFeedback('¡Correcto!')
    } else {
      setFeedback('Incorrecto.')
    }
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedOption(null)
      setFeedback(null)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">
              {quizQuestions[currentQuestion].question}
            </h3>
          </div>
          <div className="space-y-4">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer ${
                  selectedOption === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </label>
            ))}
          </div>
          {feedback && <div className="mt-4 text-lg font-bold">{feedback}</div>}
          {selectedOption !== null && (
            <button
              className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg"
              onClick={handleNextQuestion}
            >
              Siguiente Pregunta
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
