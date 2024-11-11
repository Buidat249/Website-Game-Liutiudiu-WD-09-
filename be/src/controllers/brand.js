import Brand from "../models/brand";

 // GET / brands
 export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        return res.status(200).json({
            message: "Get All Brands Done",
            data: brands,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /brands/ : id
export const getBrandDetail = async (req, res) => {
    try {
        const brand = await Brand.findOne({brand_id:req.params.id});
        if (!brand) {
            return res.status(404).json({
                message: "Brand Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Brand Detail Done",
            data: brand,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// POST /brands
export const addBrand = async (req, res) => {
    console.log("Received data:", req.body); // Kiểm tra dữ liệu nhận được
    try {
        // Tìm thương hiệu cuối cùng để lấy brand_id
        const lastBrand = await Brand.findOne({}, {}, { sort: { brand_id: -1 } });
        const newBrandId = lastBrand ? lastBrand.brand_id + 1 : 1;

        // Thêm brand_id vào dữ liệu trước khi tạo
        const brandData = {
            brand_id: newBrandId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const brand = await Brand.create(brandData);
        return res.status(201).json({
            message: "Create Brand Done",
            data: brand,
        });
    } catch (error) {
        console.error("Error creating brand:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / brands / :id

 export const updateBrand = async (req, res) => {
    try {
        const brand = await Brand.findOneAndUpdate({brand_id:req.params.id}, req.body, {
            new: true,
        });
        if (!brand) {
            return res.status(404).json({
                message: "Brand Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Brand Done",
            data: brand,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / brands / :id

export const removeBrand = async (req, res) => {
    try {
        const brand = await Brand.findOneAndDelete({brand_id:req.params.id});
        if (!brand) {
            return res.status(404).json({
                message: "Brand Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Brand Done",
            data: brand,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
