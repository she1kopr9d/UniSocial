import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    // TODO: Backend fetch notifications здесь
    // Вместо mock-логики вызовите ваш API для получения уведомлений пользователя
    const mock = [
      { id: 1, type: 'friend_request', message: 'Alice sent you a friend request', read: false, timestamp: new Date().toISOString() },
      { id: 2, type: 'like', message: 'Bob liked your post', read: false, timestamp: new Date().toISOString() },
      { id: 3, type: 'comment', message: 'Charlie commented on your post', read: true, timestamp: new Date().toISOString() }
    ];
    setNotifications(mock);
    setUnreadCount(mock.filter(n => !n.read).length);
  }, [currentUser]);

  const markAsRead = async (notificationId) => {
    // TODO: Backend mark notification as read здесь
    setNotifications((prev) => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    // TODO: Backend mark all notifications as read здесь
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
} 