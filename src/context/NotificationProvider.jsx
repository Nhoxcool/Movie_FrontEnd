import React, { createContext } from 'react';

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  return <NotificationContext value={{ updateNotification }}>{children}</NotificationContext>;
}
