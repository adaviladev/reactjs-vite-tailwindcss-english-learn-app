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
    question: 'Selecciona la respuesta más apropiada para: "Hi!"',
    options: ['What', 'Yes', 'Hi!'],
    answer: 2, // Cambio de índice para ajustar la respuesta correcta
    feedback: [
      'Incorrecto. Puedes responder el saludo "Hi" ("Hola") con el mismo saludo.',
      'Incorrecto. Puedes responder el saludo "Hi" ("Hola") con el mismo saludo.',
      'Correcto. Puedes responder el saludo "Hi" ("Hola") con el mismo saludo.'
    ]
  },
  {
    question: 'Which of these are colors?',
    options: [
      'Orange, blue, red',
      'Dark, light, transparent',
      'Tired, happy, sad'
    ],
    answer: 0, // Cambio de índice para ajustar la respuesta correcta
    feedback: [
      'Correct. Orange, blue, and red are colors.',
      'Incorrect. Dark, light, and transparent are not colors.',
      'Incorrect. Tired, happy, and sad are emotions, not colors.'
    ]
  },
  {
    question:
      'Read the following text and select the true option:\n\nHello! My name is Maria and I’m from Spain. I am a teacher. I work with young children. In my free time, I like to read books and cook Spanish food for my family. At the weekend, I enjoy meeting friends. We often visit museums and sometimes go to concerts. ',
    options: [
      'Maria is from Spain',
      'Maria is a student.',
      "She doesn't have any friends."
    ],
    answer: 0, // Cambio de índice para ajustar la respuesta correcta
    feedback: [
      'Correct. She is Spanish.',
      'Incorrect. She is a teacher.',
      'Incorrect. She enjoys meeting friends.'
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
            {percentageScore > 80 ? '¡Felicitaciones!' : '¡Sigue intentándolo!'}
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
                    className={`transition delay-100 ease-in-out ${
                      selectedOption === null
                        ? 'hover:-translate-y-1 hover:scale-105 hover:bg-neutral-300'
                        : ''
                    } block cursor-pointer rounded-lg border p-4 duration-300 ${
                      selectedOption !== null
                        ? index === quizQuestions[currentQuestion].answer
                          ? 'bg-green-500 text-white'
                          : index === selectedOption
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200'
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
