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
  ); // "tuần", "năm"

  useEffect(() => {
    // Gọi API hoặc tạo dữ liệu mẫu
    const fetchData = async () => {
      // Đây là dữ liệu giả lập. Thay bằng API thực tế của bạn.
      const mockData = {
        tuần: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [10, 20, 15, 25, 30, 40, 35], // Số game bán theo từng ngày
        },
        tháng: {
          labels: [
            "tuần 1",
            "tuần 2",
            "tuần 3",
            "tuần 4",
            "tuần 5",
          ],
          data: [50, 60, 70, 80, 90],
        },
        năm: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          data: [500, 400, 450, 700, 650, 600, 800, 850, 900, 950, 1000, 1100],
        },
      };

      setChartData({
        labels: mockData[timeFilter].labels,
        datasets: [
          {
            label: "Games Sold",
            data: mockData[timeFilter].data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      });
    };

    fetchData();
  }, [timeFilter]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Thống kê lượt mua
      </h1>

      {/* Bộ lọc thời gian */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "tuần" ? "bg-blue-600" : "bg-gray-400"
            }`}
          onClick={() => setTimeFilter("tuần")}
        >
          Tuần
        </button>
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "tháng" ? "bg-blue-600" : "bg-gray-400"
            }`}
          onClick={() => setTimeFilter("tháng")}
        >
          Tháng
        </button>
        <button
          className={`px-4 py-2 mx-2 text-white rounded ${timeFilter === "năm" ? "bg-blue-600" : "bg-gray-400"
            }`}
          onClick={() => setTimeFilter("năm")}
        >
          Năm
        </button>
      </div>

      {/* Hiển thị biểu đồ */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        {chartData ? (
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
                  text: `Thống kê lượt mua theo ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)
                    }`,
                },
              },
            }}
          />
        ) : (
          <div className="text-center text-gray-600">Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
