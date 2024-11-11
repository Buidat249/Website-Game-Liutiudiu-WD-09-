import Filter from "../models/filter";

 // GET / filters
 export const getAllFilters = async (req, res) => {
    try {
        const filters = await Filter.find();
        return res.status(200).json({
            message: "Get All filters Done",
            data: filters,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /filters/ : id
export const getFilterDetail = async (req, res) => {
    try {
        const filter = await Filter.findOne({filter_id:req.params.id});
        if (!filter) {
            return res.status(404).json({
                message: "filter Not Found",
            });
        }
        return res.status(200).json({
            message: "Get filter Detail Done",
            data: filter,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// POST /filters
export const addFilter = async (req, res) => {
    console.log("Received data:", req.body); // Kiểm tra dữ liệu nhận được
    try {
        // Tìm thương hiệu cuối cùng để lấy filter_id
        const lastfilter = await Filter.findOne({}, {}, { sort: { filter_id: -1 } });
        const newfilterId = lastfilter ? lastfilter.filter_id + 1 : 1;

        // Thêm filter_id vào dữ liệu trước khi tạo
        const filterData = {
            filter_id: newfilterId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const filter = await Filter.create(filterData);
        return res.status(201).json({
            message: "Create filter Done",
            data: filter,
        });
    } catch (error) {
        console.error("Error creating filter:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / filters / :id

 export const updateFilter = async (req, res) => {
    try {
        const filter = await Filter.findOneAndUpdate({filter_id:req.params.id}, req.body, {
            new: true,
        });
        if (!filter) {
            return res.status(404).json({
                message: "filter Not Found",
            });
        }
        return res.status(200).json({
            message: "Update filter Done",
            data: filter,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / filters / :id

export const removeFilter = async (req, res) => {
    try {
        const filter = await Filter.findOneAndDelete({filter_id:req.params.id});
        if (!filter) {
            return res.status(404).json({
                message: "filter Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete filter Done",
            data: filter,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};