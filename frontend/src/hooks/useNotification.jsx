// useNotification.js
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const incrementNotificationCount = (count) => {
    // Set the count only if it's not already set (initial load)
    if (notificationCount === 0) {
      setNotificationCount(count);
    }
  };

  const decrementNotificationCount = () => {
    setNotificationCount((prevCount) => prevCount - 1);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationCount,
        incrementNotificationCount,
        decrementNotificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
