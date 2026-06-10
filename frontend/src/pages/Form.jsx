import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    currentStatus: '',
    age: '',
    message: '',
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
      const res = await axios.post('/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
      setUser(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
       <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full gap-4">
         <div className="mb-6 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your Full Name"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">
              Current Status
            </label>
            <input
              type="text"
              className=" w-full p-3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your current status"
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
          

