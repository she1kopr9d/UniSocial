import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Feed() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Backend fetch posts здесь
    // Вместо mock-логики вызовите ваш API для получения постов
    setPosts([
      { id: 1, author: 'Alice', timestamp: '2024-05-28', content: 'Hello world!', likes: 2, comments: 1 },
      { id: 2, author: 'Bob', timestamp: '2024-05-27', content: 'My first post!', likes: 1, comments: 0 }
    ]);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Create Post Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="What's on your mind?"
          rows="3"
        />
        <div className="mt-2 flex justify-end">
          {/* TODO: Backend create post здесь */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200">
                {/* User Avatar */}
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="rounded-lg mb-4 max-h-96 w-full object-cover"
              />
            )}
            <div className="flex items-center space-x-4 text-gray-500">
              {/* TODO: Backend like, comment, share здесь */}
              <button className="flex items-center space-x-1">
                <span>Like</span>
                <span>({post.likes})</span>
              </button>
              <button className="flex items-center space-x-1">
                <span>Comment</span>
                <span>({post.comments})</span>
              </button>
              <button className="flex items-center space-x-1">
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 