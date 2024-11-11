import DescriptionDetail from "../models/description_detail";

// GET / DescriptionDetails
export const getAllDescriptionDetails = async (req, res) => {
    try {
        const descriptiondetails = await DescriptionDetail.find();
        return res.status(200).json({
            message: "Get All DescriptionDetails Done",
            data: descriptiondetails,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET / DescriptionDetails / :id
export const getDescriptionDetailDetail = async (req, res) => {
    try {
        const descriptiondetail = await DescriptionDetail.findOne({descriptiondetail_id:req.params.id});
        if (!descriptiondetail) {
            return res.status(404).json({
                message: "DescriptionDetail Not Found",
            });
        }
        return res.status(200).json({
            message: "Get DescriptionDetail Done",
            data: descriptiondetail,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// POST / DescriptionDetails
export const addDescriptionDetail = async (req, res) => {
    console.log("Received data:", req.body);
    try {
        // Tìm danh mục cuối cùng để lấy Descriptiondetail_id
        const lastDescriptionDetail = await DescriptionDetail.findOne({}, {}, { sort: { descriptiondetail_id: -1 } });

        const newDescriptionId = lastDescriptionDetail ? lastDescriptionDetail.descriptiondetail_id + 1 : 1;

        // Thêm Descriptiondetail_id vào dữ liệu trước khi tạo
        const descriptionDetailData = {
            descriptiondetail_id: newDescriptionId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const descriptiondetail = await DescriptionDetail.create(descriptionDetailData);

        return res.status(201).json({
            message: "Create DescriptionDetail Done",
            data: descriptiondetail,   
        });
    } catch (error) {
        console.error("Error creating DescriptionDetail:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

// PUT / DescriptionDetails / :id
export const updateDescriptionDetail = async (req, res) => {
    try {
        const descriptiondetail = await DescriptionDetail.findOneAndUpdate({descriptiondetail_id:req.params.id}, req.body, {
            new: true,
        });
        if (!descriptiondetail) {
            return res.status(404).json({
                message: "DescriptionDetail Not Found",
            });
        }
        return res.status(200).json({
            message: "Update DescriptionDetail Done",
            data: descriptiondetail,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE / DescriptionDetails / :id
export const removeDescriptionDetail = async (req, res) => {
    try {
        const descriptiondetail = await DescriptionDetail.findOneAndDelete({descriptiondetail_id:req.params.id});
        if (!descriptiondetail) {
            return res.status(404).json({
                message: "DescriptionDetail Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete DescriptionDetail Done",
            data: descriptiondetail,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
