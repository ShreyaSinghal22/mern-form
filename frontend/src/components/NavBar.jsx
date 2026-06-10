
import { Link } from 'react-router-dom';

const NavBar = ({user, setUser}) => {
  return (
    <nav className="bg-gray-800 p-4 flex flex-row items-center justify-between">
      <div>
        <Link to="/" className="text-white text-lg font-bold">
             Home
        </Link>
      </div>
      <div>
        <div>
          {user ? (
            <div className="flex flex-row items-center gap-4">
              <Link to="/submit-form" className="text-white text-lg font-bold ml-4">
              Form
              </Link>
              <button
                onClick={() => setUser(null)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Link to="/login" className="text-white hover:text-blue-500">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-blue-500 ml-4">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar