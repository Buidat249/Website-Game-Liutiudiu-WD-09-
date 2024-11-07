import Platform from "../models/platform";

 // GET / platforms
 export const getAllPlatforms = async (req, res) => {
    try {
        const platforms = await Platform.find();
        return res.status(200).json({
            message: "Get All Platforms Done",
            data: platforms,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /platforms/ : id
 export const getPlatformDetail = async (req, res) => {
    try {
        const platform = await Platform.findOne({platform_id:req.params.id});
        if (!platform) {
            return res.status(404).json({
                message: "Platform Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Platform Detail Done",
            data: platform,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// POST /platforms
export const addPlatform = async (req, res) => {
    console.log("Received data:", req.body); // Kiểm tra dữ liệu nhận được
    try {
        // Tìm thương hiệu cuối cùng để lấy platform_id
        const lastPlatform = await Platform.findOne({}, {}, { sort: { platform_id: -1 } });
        const newPlatformId = lastPlatform ? lastPlatform.platform_id + 1 : 1;

        // Thêm platform_id vào dữ liệu trước khi tạo
        const platformData = {
            platform_id: newPlatformId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const platform = await Platform.create(platformData);
        return res.status(201).json({
            message: "Create Platform Done",
            data: platform,
        });
    } catch (error) {
        console.error("Error creating platform:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

// PUT / platforms / :id

export const updatePlatform = async (req, res) => {
    try {
        const platform = await Platform.findOneAndUpdate({platform_id:req.params.id}, req.body, {
            new: true,
        });
        if (!platform) {
            return res.status(404).json({
                message: "Platform Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Platform Done",
            data: platform,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / platforms / :id

export const removePlatform = async (req, res) => {
    try {
        const platform = await Platform.findOneAndDelete({platform_id:req.params.id});
        if (!platform) {
            return res.status(404).json({
                message: "Platform Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Platform Done",
            data: platform,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
