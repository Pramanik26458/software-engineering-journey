import React from 'react'
import { useParams } from 'react-router-dom'

const RandomSearch = () => {
  const { Menid } = useParams()

  return (
    <div className="text-3xl font-semibold absolute top-1/2 left-1/2 -translate-1/2 text-black">
      ❌ "{Menid}" Invalid Search, Please Try Again
    </div>
  )
}

export default RandomSearch