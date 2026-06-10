import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Form from './pages/Form';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if(token) {
        try {
          const res = await axios.get('/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
        } catch (err) {
          setError('Failed to fetch user data');
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if(isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>;
  }

  return (
    <Router>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home user={user} error={error}/>}/>
        <Route path='/register' element={user ? <Navigate to='/'/> : <Register setUser={setUser}/>}/>
        <Route path='/login' element={user ? <Navigate to='/'/> : <Login setUser={setUser}/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </Router>
  )
}

export default App
