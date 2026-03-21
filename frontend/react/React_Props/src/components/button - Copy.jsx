import React from 'react'

const button = (props) => {
  return (
    <div className='bg-emerald-600 px-4 py-2 rounded m-2 w-fit text-lg font-bold cursor-pointer'>
      {props.user}
    </div>
  )
}

export default button
