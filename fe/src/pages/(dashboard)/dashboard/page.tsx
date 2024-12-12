import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

type Props = {};

const DashboardPage = (props: Props) => {
  const [chartData, setChartData] = useState<any>(null);
  const [bestSellingGame, setBestSellingGame] = useState<any[]>([]);
  const [highestGrossingGame, setHighestGrossingGame] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>('2024-01-01'); // Set default start date
  const [endDate, setEndDate] = useState<string>('2024-12-31'); // Set default end date
  const [timeFilter, setTimeFilter] = useState<"tuần" | "tháng" | "năm">("tháng");
  const [statType, setStatType] = useState<"mua" | "doanhThu" | "gameBanChay">("mua");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  // Fetch chart data, best-selling game, and highest-grossing game from backend
  const fetchData = async () => {
    try {
      const chartResponse = await axios.get(`http://localhost:8080/chart-data`, {
        params: { startDate, endDate },
      });
      setChartData(chartResponse.data);

      const bestSellingResponse = await axios.get(`http://localhost:8080/best-selling-game`, {
        params: { startDate, endDate, limit: 5 },
      });
      setBestSellingGame(Array.isArray(bestSellingResponse.data) ? bestSellingResponse.data : []);

      const highestGrossingResponse = await axios.get(`http://localhost:8080/highest-grossing-game`, {
        params: { startDate, endDate, limit: 5 },
      });
      setHighestGrossingGame(Array.isArray(highestGrossingResponse.data) ? highestGrossingResponse.data : []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Call fetchData when startDate, endDate, or statType change
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const prepareChartData = (data: any, label: string, isBestSelling: boolean) => {
    let colors = [];
    if (isBestSelling) {
      colors = data.labels.map(() => {
        const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
        return randomColor;
      });
    }

    return {
      labels: data?.labels || [],
      datasets: [
        {
          label: label,
          data: data?.datasets?.[0]?.data || [],
          backgroundColor: isBestSelling ? colors : "rgba(75, 192, 192, 0.2)",
          borderColor: isBestSelling ? colors : "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };
  const calculateTimeRange = (filter: "tuần" | "tháng" | "năm") => {
    const today = new Date();
    let newStartDate: string = ""; // Giá trị mặc định là chuỗi rỗng
    let newEndDate: string = ""; // Giá trị mặc định là chuỗi rỗng

    if (filter === "tuần") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Bắt đầu từ thứ 2
      newStartDate = startOfWeek.toISOString().split("T")[0];
      newEndDate = today.toISOString().split("T")[0];
    } else if (filter === "tháng") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      newStartDate = startOfMonth.toISOString().split("T")[0];
      newEndDate = today.toISOString().split("T")[0];
    } else if (filter === "năm") {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      newStartDate = startOfYear.toISOString().split("T")[0];
      newEndDate = today.toISOString().split("T")[0];
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setTimeFilter(filter);
  };





  const handleTimeFilterChange = () => {
    fetchData(); // Gọi lại API để lấy dữ liệu mới theo thời gian đã chọn
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Thống kê</h1>

      {/* Bộ lọc thời gian */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 mx-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 mx-2 rounded"
          />
          <button
            onClick={handleTimeFilterChange}
            className="px-4 py-2 bg-blue-600 text-white rounded ml-2"
          >
            Xác nhận
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "tuần" ? "bg-blue-600" : "bg-gray-400"}`}
            onClick={() => calculateTimeRange("tuần")}
          >
            Lọc theo Tuần
          </button>
          <button
            className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "tháng" ? "bg-blue-600" : "bg-gray-400"}`}
            onClick={() => calculateTimeRange("tháng")}
          >
            Lọc theo Tháng
          </button>
          <button
            className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "năm" ? "bg-blue-600" : "bg-gray-400"}`}
            onClick={() => calculateTimeRange("năm")}
          >
            Lọc theo Năm
          </button>
        </div>
      </div>



      {/* Bộ lọc loại biểu đồ */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${chartType === "bar" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setChartType("bar")}
        >
          Biểu đồ Cột
        </button>
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${chartType === "line" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setChartType("line")}
        >
          Biểu đồ Đường
        </button>
      </div>

      {/* Hiển thị biểu đồ thống kê */}
      <div className="flex justify-between gap-6 mb-6">
        <div className="bg-white p-4 shadow-lg rounded-lg w-1/2">
          {chartData ? (
            chartType === "bar" ? (
              <Bar
                data={prepareChartData(chartData, statType === "mua" ? "Doanh thu" : statType === "doanhThu" ? "Doanh Thu" : "Game Bán Chạy", false)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                    title: {
                      display: true,
                      text: `Thống kê ${statType === "mua" ? "Doanh thu" : statType === "doanhThu" ? "Doanh Thu" : "Game Bán Chạy"} theo ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`,
                    },
                  },
                }}
              />
            ) : (
              <Line
                data={prepareChartData(chartData, statType === "mua" ? "Doanh thu" : statType === "doanhThu" ? "Doanh Thu" : "Game Bán Chạy", false)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                    title: {
                      display: true,
                      text: `Thống kê ${statType === "mua" ? "Doanh thu" : statType === "doanhThu" ? "Doanh Thu" : "Game Bán Chạy"} theo ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`,
                    },
                  },
                }}
              />
            )
          ) : (
            <div className="text-center text-gray-600">Loading chart...</div>
          )}
        </div>

        {/* Hiển thị biểu đồ Top Selling Games */}
        <div className="bg-white p-4 shadow-lg rounded-lg w-1/2">
          {bestSellingGame.length > 0 ? (
            chartType === "bar" ? (
              <Bar
                data={prepareChartData({ labels: bestSellingGame.map(game => game.name), datasets: [{ data: bestSellingGame.map(game => game.quantity) }] }, "Game bán nhiều nhất", true)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                    title: { display: true, text: "Game bán nhiều nhất" },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw} lượt bán`;
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <Line
                data={prepareChartData({ labels: bestSellingGame.map(game => game.name), datasets: [{ data: bestSellingGame.map(game => game.quantity) }] }, "Game bán nhiều nhất", true)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                    title: { display: true, text: "Game bán nhiều nhất" },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw} lượt bán`;
                        },
                      },
                    },
                  },
                }}
              />
            )
          ) : (
            <div className="text-center text-gray-600">Loading Best Selling Games...</div>
          )}
        </div>
      </div>

      {/* Tables for highest grossing and best-selling games */}
      <div className="flex gap-6">
        {/* Highest Grossing Games */}
        <div className="bg-white p-4 shadow-lg rounded-lg w-1/2">
          <h3 className="text-xl font-semibold mb-4">Game có doanh thu cao nhất</h3>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Game</th>
                <th className="px-4 py-2">Doanh Thu</th>
              </tr>
            </thead>
            <tbody>
              {highestGrossingGame.length > 0 ? (
                highestGrossingGame.map((game, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{game.name}</td>
                    <td className="px-4 py-2">${game.revenue.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center px-4 py-2">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Best Selling Games */}
        <div className="bg-white p-4 shadow-lg rounded-lg w-1/2">
          <h3 className="text-xl font-semibold mb-4">Game bán nhiều nhất</h3>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Game</th>
                <th className="px-4 py-2">Số Lượng Bán</th>
              </tr>
            </thead>
            <tbody>
              {bestSellingGame.length > 0 ? (
                bestSellingGame.map((game, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{game.name}</td>
                    <td className="px-4 py-2">{game.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center px-4 py-2">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
