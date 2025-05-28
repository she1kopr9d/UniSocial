import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Friends() {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('friends'); // 'friends' or 'requests'

  useEffect(() => {
    // TODO: Fetch friends and friend requests
    setIsLoading(false);
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      // TODO: Accept friend request
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // TODO: Reject friend request
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      // TODO: Remove friend
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          <button
            className={`pb-4 ${
              activeTab === 'friends'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('friends')}
          >
            Friends ({friends.length})
          </button>
          <button
            className={`pb-4 ${
              activeTab === 'requests'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('requests')}
          >
            Friend Requests ({friendRequests.length})
          </button>
        </div>
      </div>

      {/* Friends List */}
      {activeTab === 'friends' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div key={friend.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200">
                  {/* Friend Avatar */}
                </div>
                <div className="flex-1">
                  <Link
                    to={`/profile/${friend.id}`}
                    className="font-semibold hover:text-blue-600"
                  >
                    {friend.name}
                  </Link>
                  <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                </div>
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Friend Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {friendRequests.map((request) => (
            <div key={request.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200">
                  {/* Request Sender Avatar */}
                </div>
                <div className="flex-1">
                  <Link
                    to={`/profile/${request.senderId}`}
                    className="font-semibold hover:text-blue-600"
                  >
                    {request.senderName}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {request.mutualFriends} mutual friends
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 