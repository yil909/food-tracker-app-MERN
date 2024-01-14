import React, { useState, useEffect } from "react";
import axios from "axios";
import { LOCAL_IP, PORT } from "../../../backend/config";

function useTransactionLog() {
  const [log, setLog] = useState([]);

  const getLog = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/allLog"
      );
      setLog(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getLog();
  }, []);

  return {
    log,
    getLog,
  };
}

export default useTransactionLog;
