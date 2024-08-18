import React, { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

type Question = {
  question: string
  options: string[]
  answer: number
  feedback: string[] // Array para feedbacks específicos para cada opción
}

const quizQuestions: Question[] = [
  {
    question: '¿Cuál es el idioma más hablado en el mundo?',
    options: ['Inglés', 'Mandarín', 'Español'],
    answer: 1,
    feedback: [
      'Incorrecto. El inglés es ampliamente hablado, pero no es el más hablado.',
      '¡Correcto! El mandarín es el idioma más hablado en el mundo.',
      'Incorrecto. El español es muy hablado, pero no tanto como el mandarín.'
    ]
  },
  {
    question: '¿En qué año llegó el hombre a la luna?',
    options: ['1965', '1969', '1972'],
    answer: 1,
    feedback: [
      'Incorrecto. La misión Apolo 11 llegó a la luna en 1969.',
      '¡Correcto! El hombre llegó a la luna en 1969 durante la misión Apolo 11.',
      'Incorrecto. La misión Apolo 11 llegó a la luna en 1969.'
    ]
  },
  {
    question: '¿Cuál es el planeta conocido como el planeta rojo?',
    options: ['Venus', 'Marte', 'Júpiter'],
    answer: 1,
    feedback: [
      'Incorrecto. Venus es el segundo planeta desde el sol, pero no es el planeta rojo.',
      '¡Correcto! Marte es conocido como el planeta rojo debido a su color característico.',
      'Incorrecto. Júpiter es el planeta más grande del sistema solar, pero no es el planeta rojo.'
    ]
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
    if (selectedOption === null) {
      setSelectedOption(index)
      if (index === quizQuestions[currentQuestion].answer) {
        setScore((prevScore) => prevScore + 1)
      }
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
    <div className="flex h-screen items-center justify-center bg-indigo-950">
      {showResult ? (
        <div className="w-full max-w-xl rounded-lg bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">
            {percentageScore > 70 ? '¡Felicitaciones!' : '¡Bien hecho!'}
          </h2>
          <p className="mb-6 text-lg">
            Obtuviste {score} de {quizQuestions.length} respuestas correctas (
            {percentageScore}%).
          </p>
          {percentageScore > 70 && <Confetti width={width} height={height} />}
          <button
            className="rounded-lg bg-blue-600 p-2 text-white"
            onClick={() => window.location.reload()}
          >
            Volver a intentar
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
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
                    className={`transition ease-in-out delay-150 ${
                      selectedOption === null
                        ? 'hover:-translate-y-1 hover:scale-105 hover:bg-neutral-300'
                        : ''
                    } duration-300 block cursor-pointer rounded-lg border p-4 ${
                      selectedOption === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200'
                    } ${selectedOption !== null ? 'cursor-default' : ''}`}
                    onClick={() => handleOptionClick(index)}
                  >
                    {option}
                  </label>
                  {selectedOption === index && (
                    <div className="mt-2 text-center text-lg font-bold">
                      {quizQuestions[currentQuestion].feedback[index]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedOption !== null && (
              <button
                className="mt-6 w-full rounded-lg bg-blue-600 p-2 text-white"
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
