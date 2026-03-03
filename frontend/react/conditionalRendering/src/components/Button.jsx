import React from 'react'

const Button = () => {
  function btnCliked(){
    console.log("Button is clicked !!!")
  }
  return (
    <div>
      <button onClick={btnCliked}
       className='bg-emerald-500 text-white px-6 py-3 rounded font-bold mt-2 active:scale-95 cursor-pointer'>Click to download</button>
    </div>
  )
}


export default Button
