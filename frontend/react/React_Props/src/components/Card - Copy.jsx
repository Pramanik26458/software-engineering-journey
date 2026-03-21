import React from 'react'

const Card = (props) => {
  return (
    <div className="bg-amber-500 m-2 px-10 py-5 w-fit rounded-2xl border-2">
      <h1 className='text-2xl font-semibold '>{props.user}</h1>
    </div>
  )
}

export default Card
