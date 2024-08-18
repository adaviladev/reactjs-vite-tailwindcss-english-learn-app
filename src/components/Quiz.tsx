import React, { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

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
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const { width, height } = useWindowSize()

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
    if (index === quizQuestions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedOption(null)
    } else {
      setShowResult(true)
    }
  }

  const percentageScore = (score / quizQuestions.length) * 100

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {showResult ? (
        <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            {percentageScore > 70 ? '¡Felicitaciones!' : '¡Bien hecho!'}
          </h2>
          <p className="text-lg mb-6">
            Obtuviste {score} de {quizQuestions.length} respuestas correctas (
            {percentageScore}%).
          </p>
          {percentageScore > 70 && <Confetti width={width} height={height} />}
          <button
            className="bg-blue-600 text-white p-2 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Volver a intentar
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">
                {quizQuestions[currentQuestion].question}
              </h3>
            </div>
            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <div key={index}>
                  <label
                    className={`block p-4 border rounded-lg cursor-pointer ${
                      selectedOption === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => handleOptionClick(index)}
                  >
                    {option}
                  </label>
                  {selectedOption === index && selectedOption !== null && (
                    <div className="mt-2 text-lg font-bold text-center">
                      {index === quizQuestions[currentQuestion].answer
                        ? '¡Correcto!'
                        : 'Incorrecto.'}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedOption !== null && (
              <button
                className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg"
                onClick={handleNextQuestion}
              >
                {currentQuestion < quizQuestions.length - 1
                  ? 'Siguiente Pregunta'
                  : 'Ver Resultados'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
