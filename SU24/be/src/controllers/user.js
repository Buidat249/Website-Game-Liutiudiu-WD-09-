import User from "../models/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

 // GET / users
 export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "Get All Users Done",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// GET /users/ : id
export const getUserDetail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        return res.status(200).json({
            message: "Get User Detail Done",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// POST / register
export const Register = async(req, res) => {
    try {
        const body = req.body;
        body.password = await bcryptjs.hash(body.password, 6);
        const userModel = new User(body);
        const user = await userModel.save();
        res.status(201).send({ user: user, message: "Đăng ký thành công" });
    } catch (error) {
        res.status(500).send({ message: "Đăng ký thất bại: " + error });
    }
}
// POST / login
export const Login = async(req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({
            email: body.email
        });
        if (!user) {
            return res.status(404).send({ message: "Không tìm thấy Email" });
        } 
        const verify = await bcryptjs.compare(body.password, user.password);
        if (verify) {
            const token = await jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET || '123456',  // It's better to use an environment variable for the secret
                { expiresIn: '1h' }
            );
            res.send({ status: true, message: "Đăng nhập thành công", token: token ,  email: user.email , password: user.password });
        } else {
            res.status(401).send({ status: false, message: "Sai mật khẩu" });
        }
    } catch (error) {
        res.status(500).send({ message: "Đăng nhập thất bại: " + error });
    }
};

// PUT / users / :id

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        return res.status(200).json({
            message: "Update User Done",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / users / :id

export const removeUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete User Done",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

