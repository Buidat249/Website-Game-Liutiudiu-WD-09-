import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import moment from "moment-timezone"; // Thêm thư viện moment-timezone
import "../styles/style.scss";

type Props = {};

const Chatbox = (props: Props) => {
  const [chatData, setChatData] = useState([]); // State lưu dữ liệu chat
  const [currentChat, setCurrentChat] = useState("general"); // Chat hiện tại
  const [inputValue, setInputValue] = useState(""); // Nội dung input

  // Options để chuyển đổi chat
  const options = [
    { label: "General Chat", content: "general", room_code: 1 },
    { label: "Gaming Chat", content: "gaming", room_code: 2 },
    { label: "Tech Chat", content: "tech", room_code: 3 },
  ];

  // Gọi API để lấy dữ liệu chat
  const fetchChatData = async (room_code: number) => {
    try {
      setChatData([]);
      const response = await axios.get(`http://localhost:8080/forum-conversition?room_code=${room_code}&limit=1000000`);
      setChatData(response.data.data || []); // Gán dữ liệu chat từ API
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  // Khi đổi chat
  const changeChat = (option: string, room_code: number) => {
    setCurrentChat(option); // Đổi chat hiện tại
    fetchChatData(room_code); // Gọi API theo room_code
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!inputValue.trim()) return; // Không gửi tin nhắn rỗng
    const currentOption = options.find((o) => o.content === currentChat);
    if (!currentOption) return;

    try {
      await axios.post("http://localhost:8080/forum-conversition", {
        room_code: currentOption.room_code,
        user_id: localStorage.getItem('user_id'), // Thay bằng `user_id` thực tế
        content: inputValue,
      });
      // Thêm tin nhắn mới vào danh sách
      setInputValue(""); // Xóa nội dung input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Lấy dữ liệu chat lần đầu khi load component
  useEffect(() => {
    // Kết nối đến server Socket.IO
    const socket = io("http://localhost:8080");

    // Lắng nghe sự kiện từ server
    socket.on("connect", () => {
      console.log("Đã kết nối với server socket!");
    });

    socket.on("new_message", (data: any) => {
      const curr_room_chat = options.find((o) => o.content === currentChat)?.room_code || 1;
      if (data.room_code === curr_room_chat)
        setChatData((prev: any) => [...prev, data] as any);
    });

    const initialRoomCode = options.find((o) => o.content === currentChat)?.room_code || 1;
    fetchChatData(initialRoomCode);

    // Thực hiện cleanup khi component unmount
    return () => {
      socket.disconnect();
      console.log("Đã ngắt kết nối với server socket!");
    };
  }, [currentChat]);

  // Chuyển đổi thời gian khi nhận dữ liệu chat
  const formatMessageTime = (time: string) => {
    const clientTimezone = moment.tz.guess(); // Múi giờ của client
    return moment(time).tz(clientTimezone).format("YYYY-MM-DD HH:mm:ss"); // Chuyển thời gian sang múi giờ của client
  };

  return (
    <div style={{ marginTop: "20px" }} className="main flex h-screen bg-gray ">
      {/* Sidebar */}
      <div className="w-48 bg-[#02132E] p-4 space-y-4">
        <h2 className="text-lg font-semibold text-white">Chọn Chat</h2>
        {options.map((option) => (
          <button
            key={option.content}
            onClick={() => changeChat(option.content, option.room_code)}
            className={`w-full text-left p-2 rounded hover:bg-gray-700 text-white ${currentChat === option.content ? "bg-gray-700" : ""
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#02132E] p-2 shadow-md ">
          <h2 className="text-lg font-medium capitalize text-white">#{currentChat}</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 bg-white-500 overflow-y-auto space-y-4 border">
          {chatData.map((chat: any, index: number) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${chat.user_id.user_id === parseInt(localStorage.getItem('user_id') || '') ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`h-8 w-8 ${chat.bgColor || "bg-gray-500"} rounded-full flex items-center justify-center text-sm font-semibold`}
              >
                {chat.user_id.username.substring(0, 2).toUpperCase()}
              </div>

              <div className={`flex flex-col space-y-1 ${chat.user_id.user_id === parseInt(localStorage.getItem('user_id') || '') ? "items-end" : "items-start"}`}>
                {/* Username and Date */}
                <div className={`flex ${chat.user_id.user_id === parseInt(localStorage.getItem('user_id') || '') ? "flex-row-reverse" : "flex-row"} space-x-1`}>
                  <span style={{ margin: '5px' }} className="font-semibold">{chat.user_id.username}</span>
                  <span className="text-gray-400 text-xs">{formatMessageTime(chat.createdAt)}</span>
                </div>
                {/* Message Content */}
                <p>{chat.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center space-x-2 bg-gray-700 rounded p-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Nhắn #${currentChat}`}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            />
            <button onClick={sendMessage} className="text-gray-400 hover:text-gray-300">
              Gửi
            </button>
          </div>
        </div>
      </div>
      <div style={{ width: "3px" }} className="bg-[#02132E] "></div>
    </div>
  );
};

export default Chatbox;
