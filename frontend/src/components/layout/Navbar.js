import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            UniSocial
          </Link>

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link to="/feed" className="text-gray-600 hover:text-gray-900">Feed</Link>
              <Link to="/friends" className="text-gray-600 hover:text-gray-900">Friends</Link>
              <Link to="/messages" className="text-gray-600 hover:text-gray-900">Messages</Link>
              <Link to="/groups" className="text-gray-600 hover:text-gray-900">Groups</Link>
              <Link to="/notifications" className="text-gray-600 hover:text-gray-900">Notifications</Link>
              <Link to={`/profile/${currentUser.uid}`} className="text-gray-600 hover:text-gray-900">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}; 