import React, { useEffect, useState } from "react";
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
  const [timeFilter, setTimeFilter] = useState<"tuần" | "tháng" | "năm">(
    "tháng"
  );
  const [statType, setStatType] = useState<"mua" | "doanhThu" | "gameBanChay">(
    "mua"
  ); // "mua", "doanhThu", "gameBanChay"
  const [chartType, setChartType] = useState<"bar" | "line">("bar"); // Chọn loại biểu đồ

  useEffect(() => {
    // Dữ liệu giả lập cho từng loại thống kê
    const mockData = {
      tuần: {
        mua: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [10, 20, 15, 25, 30, 40, 35],
        },
        doanhThu: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [100, 200, 150, 250, 300, 400, 350], // Doanh thu theo từng ngày
        },
        gameBanChay: {
          labels: ["Game A", "Game B", "Game C", "Game D"],
          data: [50, 70, 80, 90], // Số lượng bán của các game
        },
      },
      tháng: {
        mua: {
          labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5"],
          data: [50, 60, 70, 80, 90],
        },
        doanhThu: {
          labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5"],
          data: [500, 600, 700, 800, 900], // Doanh thu theo từng tuần
        },
        gameBanChay: {
          labels: ["Game A", "Game B", "Game C", "Game D"],
          data: [150, 200, 250, 300], // Số lượng bán của các game
        },
      },
      năm: {
        mua: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [500, 400, 450, 700, 650, 600, 800, 850, 900, 950, 1000, 1100],
        },
        doanhThu: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [5000, 4000, 4500, 7000, 6500, 6000, 8000, 8500, 9000, 9500, 10000, 11000], // Doanh thu trong năm
        },
        gameBanChay: {
          labels: ["Game A", "Game B", "Game C", "Game D"],
          data: [1500, 2000, 2500, 3000], // Số lượng bán của các game
        },
      },
    };

    setChartData({
      labels: mockData[timeFilter][statType].labels,
      datasets: [
        {
          label:
            statType === "mua"
              ? "Games Sold"
              : statType === "doanhThu"
              ? "Revenue"
              : "Top Selling Games",
          data: mockData[timeFilter][statType].data,
          backgroundColor:
            statType === "gameBanChay"
              ? "rgba(255, 159, 64, 0.2)"
              : "rgba(75, 192, 192, 0.2)",
          borderColor:
            statType === "gameBanChay"
              ? "rgba(255, 159, 64, 1)"
              : "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: statType !== "gameBanChay", // Game bán chạy không cần fill
        },
      ],
    });
  }, [timeFilter, statType]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Thống kê</h1>

      {/* Bộ lọc thời gian */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "tuần" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setTimeFilter("tuần")}
        >
          Tuần
        </button>
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "tháng" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setTimeFilter("tháng")}
        >
          Tháng
        </button>
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "năm" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setTimeFilter("năm")}
        >
          Năm
        </button>
      </div>

      {/* Bộ lọc loại thống kê */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${statType === "mua" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setStatType("mua")}
        >
          Lượt Mua
        </button>
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${statType === "doanhThu" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setStatType("doanhThu")}
        >
          Doanh Thu
        </button>
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${statType === "gameBanChay" ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setStatType("gameBanChay")}
        >
          Game Bán Chạy
        </button>
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

      {/* Hiển thị biểu đồ */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        {chartData ? (
          chartType === "bar" ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: `Thống kê ${statType === "mua" ? "Lượt Mua" : statType === "doanhThu" ? "Doanh Thu" : "Game Bán Chạy"} theo ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`,
                  },
                },
              }}
            />
          ) : (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: `Thống kê ${statType === "mua" ? "Lượt Mua" : statType === "doanhThu" ? "Doanh Thu" : "Game Bán Chạy"} theo ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`,
                  },
                },
              }}
            />
          )
        ) : (
          <div className="text-center text-gray-600">Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
