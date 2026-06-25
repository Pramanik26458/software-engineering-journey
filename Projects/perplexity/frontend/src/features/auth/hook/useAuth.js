import { useDispatch } from 'react-redux';
import { register, login, getMe, logoutApi } from '../service/auth.api';
import { setUser, setLoading, setError, logout } from '../auth.slice';

export function useAuth() {
  const dispatch = useDispatch();


  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await register({ email, username, password });
      dispatch(setUser(data.user));
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      dispatch(setError(msg));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
     
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      dispatch(setError(msg));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout() {
    try {
      await logoutApi();
    } catch {
    } finally {
      dispatch(logout());
    }
  }

  return { handleRegister, handleLogin, handleGetMe, handleLogout };
}
