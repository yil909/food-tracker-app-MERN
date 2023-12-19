import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import useTransactionLog from "../../../hooks/useTransactionLog.js";

const WasteOverTime = () => {
  const { log, getLog } = useTransactionLog();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getLog();
      let wasteData = {};

      log.forEach((item) => {
        if (item.act === "WASTE" && item.userid === 1) {
          const date = item.timestamp.slice(0, 10);


          wasteData[date] =
              (wasteData[date] || 0) + item.quantity * item.priceperunit;
        }
      });

      const formattedData = Object.keys(wasteData).map((date) => ({
        date: date,
        wasteCost: wasteData[date],
      }));

      // 对数据按日期排序
      formattedData.sort((a, b) => (a.date > b.date ? 1 : -1));

      setData(formattedData);
    };

    fetchData();
  }, [getLog, log]);


  return (
    <>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          label={{ value: "Cost ($)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="wasteCost"
          name="Waste Cost"
          stroke="#8884d8"
        />
      </LineChart>
    </>
  );
};

export default WasteOverTime;
