import Tintuc from "../models/tintuc";

 // GET / tintucs
 export const getAllTintucs = async (req, res) => {
    try {
        const tintucs = await Tintuc.find();
        return res.status(200).json({
            message: "Get All Tintucs Done",
            data: tintucs,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /tintucs/ : id
 export const getTintucDetail = async (req, res) => {
    try {
        const tintuc = await Tintuc.findOne({tintuc_id:req.params.id});
        if (!tintuc) {
            return res.status(404).json({
                message: "Tintuc Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Tintuc Detail Done",
            data: tintuc,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // POST /tintucs/
export const addTintuc = async (req, res) => {
    console.log("Received data:", req.body); // Kiểm tra dữ liệu nhận được
    try {
        // Tìm thương hiệu cuối cùng để lấy brand_id
        const lastTintuc = await Tintuc.findOne({}, {}, { sort: { tintuc_id: -1 } });
        const newTintucId = lastTintuc ? lastTintuc.tintuc_id + 1 : 1;

        const tintucData = {
            tintuc_id: newTintucId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const tintuc = await Tintuc.create(tintucData);
        return res.status(201).json({
            message: "Create Tintuc Done",
            data: tintuc,
        });
    } catch (error) {
        console.error("Error creating tintuc:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

//PUT /tintucs/ :id
export const updateTintuc = async (req, res) => {
    try {
        const tintuc = await Tintuc.findOneAndUpdate({tintuc_id:req.params.id}, req.body, {
            new: true,
        });
        if (!tintuc) {
            return res.status(404).json({
                message: "Tintuc Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Tintuc Done",
            data: tintuc,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / tintucs / :id

export const removeTinTuc = async (req, res) => {
    try {
        const tintuc = await Tintuc.findOneAndDelete({tintuc_id:req.params.id});
        if (!tintuc) {
            return res.status(404).json({
                message: "Tintuc Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Tintuc Done",
            data: tintuc,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};