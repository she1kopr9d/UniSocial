import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Backend fetch profile здесь
    // Вместо mock-логики вызовите ваш API для получения профиля пользователя
    setProfile({
      displayName: 'User ' + id,
      bio: 'This is a mock bio.',
      about: 'Some info about the user.',
      email: id + '@example.com'
    });
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="h-24 w-24 rounded-full bg-gray-200">
            {/* Profile Image */}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.displayName || 'User'}</h1>
            <p className="text-gray-600">{profile?.bio || 'No bio yet'}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p>{profile?.about || 'No information available'}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>{profile?.email || 'No contact information'}</p>
          </div>
        </div>

        {currentUser?.uid !== id && (
          <div className="mt-6">
            {/* TODO: Backend add friend здесь */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add Friend
            </button>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        <div className="space-y-4">
          {/* TODO: Backend user posts здесь */}
        </div>
      </div>
    </div>
  );
} 