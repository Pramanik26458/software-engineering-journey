import { RouterProvider } from 'react-router-dom';
import { router } from './App.routes';
import { useAuth } from '../features/auth/hook/useAuth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const auth = useAuth();
 
  useEffect(() => {
    auth.handleGetMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeMode = useSelector((state) => state.theme.mode);
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  return <RouterProvider router={router} />;
}

export default App;
