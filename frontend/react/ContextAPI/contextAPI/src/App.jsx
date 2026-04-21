import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Allcourses from './components/Allcourses';
import Allsection from './components/Allsection';
import Footer from './components/Footer';

const App = () => {
  const [theme, setTheme] = useState('light')
  const changeTheme = (newTheme) => {
  setTheme(newTheme);
  }
  return (
    <div>
      <Navbar  theme={theme} changeTheme={changeTheme} />
      
    </div>
  );
};

export default App;