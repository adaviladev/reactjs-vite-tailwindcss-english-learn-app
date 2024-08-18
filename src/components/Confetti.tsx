import React from 'react'
import ReactConfetti from 'react-confetti'

const ConfettiComponent = ({ width, height }) => {
  return (
    <>
      <ReactConfetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
      />
    </>
  )
}

export default ConfettiComponent
