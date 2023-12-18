import useTransactionLog from "../../../hooks/useTransactionLog.js";
import { useEffect, useState } from "react";

const OverallWaste = () => {
  const { log, getLog } = useTransactionLog();
  const [allWaste, setAllWaste] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await getLog();
      const totalWaste = log.reduce((total, item) => {
        if (item.act === "WASTE") {
          return total + item.quantity * item.priceperunit;
        }
        return total;
      }, 0);

      setAllWaste(totalWaste);
    };

    fetchData();
  }, [getLog, log]);

  return <div className="overall-waste">{`$${allWaste}`}</div>;
};

export default OverallWaste;
