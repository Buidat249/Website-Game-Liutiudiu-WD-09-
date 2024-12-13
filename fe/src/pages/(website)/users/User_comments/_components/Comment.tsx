import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Comment = () => {
  const [filters, setFilters] = useState({
    description: "",
    dateFrom: "",
    dateTo: "",
  });
  const [comments, setComments] = useState<any[]>([]);
  const [filteredComments, setFilteredComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch comments of the user
  useEffect(() => {
    const user_id = Number(localStorage.getItem('user_id'));
    const fetchComments = async () => {
      setLoading(true);  // Đặt loading = true khi bắt đầu fetch dữ liệu
      try {
        const response = await axios.get(`http://localhost:8080/users/${user_id}/comments`);
        console.log("Danh sách bình luận:", response.data); // In ra data chính xác
        setComments(response.data.data);  // Lấy đúng data từ response.data.data
        setFilteredComments(response.data.data);  // Cập nhật filteredComments với data từ API
        setLoading(false);  // Set loading = false khi đã nhận được dữ liệu
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);  // Set loading = false nếu có lỗi
      }
    };

    fetchComments();
  }, []);


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    const { description, dateFrom, dateTo } = filters;
    const filtered = comments.filter((comment: any) => {
      const matchesDescription = description
        ? comment.content.toLowerCase().includes(description.toLowerCase())
        : true;
      const matchesDateFrom = dateFrom
        ? new Date(comment.created_at) >= new Date(dateFrom)
        : true;
      const matchesDateTo = dateTo
        ? new Date(comment.created_at) <= new Date(dateTo)
        : true;

      return matchesDescription && matchesDateFrom && matchesDateTo;
    });
    setFilteredComments(filtered);
  };

  const handleViewDetail = (gameId: any) => {
    navigate(`/productgame/${gameId}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Bình luận của tôi</h2>
      <p className="text-gray-600 mb-4">
        Bình luận và trả lời mà bạn đã viết trên Liutiudiu Shop
      </p>

      {/* Bộ lọc */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          name="description"
          placeholder="Nội dung"
          value={filters.description}
          onChange={handleInputChange}
          className="col-span-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          onClick={handleFilter}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h3.757a1 1 0 01.707.293l2.828 2.828a1 1 0 00.707.293H21a1 1 0 011 1v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a1 1 0 011-1z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8h18M9 21v-3a3 3 0 013-3h0a3 3 0 013 3v3M3 14h18"
            />
          </svg>
          Lọc
        </button>
      </div>

      {/* Bảng hiển thị bình luận */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-700 w-1/4 border-r">
                Thời gian
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Nội dung
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700 w-1/6">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="py-3 px-4 text-center">Đang tải dữ liệu...</td>
              </tr>
            ) : (
              filteredComments.length > 0 ? (
                filteredComments.map((comment: any) => (
                  <tr key={comment._id}>
                    <td className="py-3 px-4 border-b text-gray-600">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-600">
                      {comment.content}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-600">
                      {comment.game_id != null ? (
                        <button
                          onClick={() => handleViewDetail(comment.game_id)}
                          className="text-blue-500 hover:underline"
                        >
                          Xem chi tiết
                        </button>
                      ) : (
                        "Không xác định"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 px-4 text-center">Không có dữ liệu</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
