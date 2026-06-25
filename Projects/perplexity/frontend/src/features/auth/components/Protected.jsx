import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07090f] dark:bg-[#07090f] bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          {/* Animated pulse ring */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 animate-ping absolute inset-0" />
            <div className="w-12 h-12 rounded-full border-2 border-t-cyan-400 border-r-violet-400 border-b-cyan-400/20 border-l-violet-400/20 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Authenticating</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
