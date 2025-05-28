import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to UniSocial
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Connect with your university community, share experiences, and make new friends.
            </p>
            <div className="mt-10">
              {currentUser ? (
                <Link
                  to="/feed"
                  className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-600"
                >
                  Go to Feed
                </Link>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="inline-block bg-gray-200 text-gray-700 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay connected
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  👥
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Connect with Friends
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Find and connect with your university friends, classmates, and alumni.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  💬
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Real-time Messaging
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Chat with your friends and groups in real-time.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  👥
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Join Groups
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Create and join groups based on your interests and courses.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  📢
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Stay Updated
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get notifications about events, posts, and friend requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 