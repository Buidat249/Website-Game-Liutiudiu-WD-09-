import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Vui lòng đăng nhập" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456");
    req.user = decoded; // Gắn thông tin người dùng vào req để truy cập sau
    next();
  } catch (error) {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
};
