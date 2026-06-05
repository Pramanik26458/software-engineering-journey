import React,{useEffect} from 'react';
import { useSelector } from "react-redux";

import {useChat} from "../hooks/useChat"


const Dashboard = () => {

  const chat=useChat();
  // Directly select the user object instead of trying to destructure an undefined nested property
  const { user } = useSelector(state => state.auth);
  useEffect(()=>{
    chat.initializeSocketConnection()
  },[])
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      {user ? (
        <div className="bg-slate-800 p-6 rounded-xl border border-purple-500/30 shadow-xl text-center">
          <p className="text-slate-300">Name: <span className="text-cyan-400 font-semibold">{user.username}</span></p>
          <p className="text-slate-300">Email: <span className="text-purple-400 font-semibold">{user.email}</span></p>
        </div>
      ) : (
        <p className="text-red-400">No user data available.</p>
      )}
    </div>
  );
};

export default Dashboard;