import { useDispatch } from "react-redux";
import { register, login, getMe } from '../service/auth.api';
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister(email, username, password) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register(email, username, password);
            dispatch(setUser(data.user));
        } catch (err) {
            dispatch(setError(err.message || 'Registration failed'));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin(payload) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login(payload.email, payload.password);
            dispatch(setUser(data.user));
            return data;
        } catch (err) {
            dispatch(setError(err.message || "Login failed"));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() { // Changed to uppercase M to match App.jsx
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await getMe();
            dispatch(setUser(data.user));
        } catch (err) {
            console.log("User not authenticated");
            dispatch(setUser(null));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin, handleGetMe };
}