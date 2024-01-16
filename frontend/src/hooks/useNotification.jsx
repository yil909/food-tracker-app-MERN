// useNotification.js
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const incrementNotificationCount = (count = 1) => {
    setNotificationCount((prevCount) => prevCount + count);
  };

  const decreaseNotificationCount = () => {
    setNotificationCount((prevCount) => prevCount - 1);
  };

  return (
    <NotificationContext.Provider
      value={{ notificationCount, incrementNotificationCount, decreaseNotificationCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
