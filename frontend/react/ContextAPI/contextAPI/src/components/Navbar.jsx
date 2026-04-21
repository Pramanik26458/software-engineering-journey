import React from 'react'

const Navbar = (props) => {
    const [newTheme, setNewTheme] = React.useState('');
  return (
    <div className='nav'>
    <h1>theme is {props.theme}</h1>
   <form onSubmit={(e)=>{
        e.preventDefault()
        props.changeTheme(newTheme);
        setNewTheme('');
      }}>
        <input
        
         type="text" placeholder='Enter Theme'
         value={newTheme}
         onChange={(e) => setNewTheme(e.target.value)}
        />
        <button>Change Theme</button>
      </form>

    
    </div>

  )
}

export default Navbar