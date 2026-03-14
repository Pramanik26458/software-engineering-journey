import React from 'react'

const Card = (props) => {
  return (
<div>

  <div  className='lg:w-[20vw] md:w-[30vw] sm:w-[45vw]  bg-blue-200 py-8 px-8 flex  flex-wrap items-center  flex-col rounded-xl text-black '>
        <img className='h-24 w-24 rounded-full ' src={props.elem.imageUrl} alt="img" />
        <h1 className='text-2xl mt-2 font-bold'>{props.elem.username}</h1>
        <h5 className='text-blue-500 text-lg font-semibold my-2 '>{props.elem.userRole}</h5>
        <p className='text-sm font-medium leading-tight px-4 py-2 '>{props.elem.description} </p>
        <button  onClick={()=>{
          props.deleteHandler(props.idx)
        }} className='text-xs cursor-pointer  px-4 py-4  rounded bg-red-600 text-white font-semibold mt-4 active:scale-95'>Remove</button>
    </div>
</div>
  )
}

export default Card