import { useEffect } from "react";
import { io } from "socket.io-client";
import Router from "./routes";

function App() {
    useEffect(() => {
        // Kết nối đến server Socket.IO
        const socket = io("http://localhost:8080");

        // Lắng nghe sự kiện từ server
        socket.on("connect", () => {
            console.log("Đã kết nối với server socket!");
        });

        // Thực hiện cleanup khi component unmount
        return () => {
            socket.disconnect();
            console.log("Đã ngắt kết nối với server socket!");
        };
    }, []);

    return (
        <>
            <Router />
        </>
    );
}

export default App;
