import UsertModel from "../models/auth";
import jwt from "jsonwebtoken";
import bcrypjs from "bcryptjs";
export const Register = async(req, res) => {
    try {
        const body = req.body;
        body.password = await bcrypjs.hash(body.password, 8)
        const usertmodel = new UsertModel(body);
        const user = await usertmodel.save();
        res.send({ user: user, message: "dang ky tc" })
    } catch (error) {
        res.send({ message: "TB" + error })
    }
}
export const Login = async(req, res) => {
    try {
        const body = req.body;
        const user = await UsertModel.findOne({
            email: body.email
        });
        if (user === null) {
            res.send({ message: "khong tim thay" })
        } else {
            const verify = await bcrypjs.compare(body.password, user.password)
            if (verify) {
                const token = await jwt.sign({
                        id: user._id
                    },
                    '123456')
                res.send({ status: true, message: "DN tc", token: token })
            } else {
                res.send({ status: false, message: "DN sai", })
            }
        }
    } catch (error) {
        console.log(error);
    }
}