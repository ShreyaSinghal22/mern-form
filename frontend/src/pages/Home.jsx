
import { Link } from "react-router-dom";

const Home = ({user, error}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Home
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {user ? (
          <p className="text-gray-700 text-center">
            Welcome, {user.name}!
          </p>
        ) : (
          <div className="text-center">
            <p className="text-gray-700 text-center">
              Please log in to view your profile.
            </p>
            <div>
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-500 hover:underline ml-4">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home