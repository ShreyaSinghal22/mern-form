import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(''); 
      const res = await axios.post('/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
      setUser(res.data);
      navigate('/');
    } catch (err) {
      console.error("The real culprit:", err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
       <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full gap-4">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className=" w-full p-3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login