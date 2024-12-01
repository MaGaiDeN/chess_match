import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Home from './pages/Home';
import Board from './components/Board/Board';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Lobby from './pages/Lobby/Lobby';
import Challenge from './pages/Challenge/Challenge';
import CompleteProfile from './pages/CompleteProfile/CompleteProfile';
import './styles/Home.css';
import './styles/Board.css';
import './App.css';
import { AuthProvider } from './context/AuthContext';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const location = useLocation();
  
  // Extraer challengeId si existe en la URL
  const challengeId = window.location.href.match(/challenge\/([^/]+)/)?.[1];
  const loginPath = challengeId ? `/login?challenge=${challengeId}` : '/login';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(user ? 'authenticated' : 'unauthenticated');
    });

    return () => unsubscribe();
  }, []);

  if (authState === 'loading') {
    return <div>Cargando...</div>;
  }

  if (authState === 'unauthenticated') {
    return <Navigate to={loginPath} state={{ redirect: location.pathname }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/chess_match">
        <div className="app-container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Rutas protegidas */}
            <Route path="/lobby" element={
              <ProtectedRoute>
                <Lobby />
              </ProtectedRoute>
            } />
            
            <Route path="/challenge/:challengeId" element={
              <ProtectedRoute>
                <Challenge />
              </ProtectedRoute>
            } />

            <Route path="/play">
              <Route path="computer" element={<Board />} />
              <Route path="online" element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              } />
              <Route path="friend" element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              } />
              <Route path="puzzle" element={<Board isPuzzle={true} />} />
            </Route>

            <Route path="/complete-profile" element={<CompleteProfile />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;