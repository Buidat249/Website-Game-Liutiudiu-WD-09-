import Role from "../models/role";

 // GET / roles
 export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        return res.status(200).json({
            message: "Get All Roles Done",
            data: roles,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /roles/ : id
 export const getRoleDetail = async (req, res) => {
    try {
        const role = await Role.findOne({role_id:req.params.id});
        if (!role) {
            return res.status(404).json({
                message: "Role Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Role Detail Done",
            data: role,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// POST /roles
export const addRole = async (req, res) => {
    console.log("Received data:", req.body); // Kiểm tra dữ liệu nhận được
    try {
        // Tìm thương hiệu cuối cùng để lấy role_id
        const lastRole = await Role.findOne({}, {}, { sort: { role_id: -1 } });
        const newRoleId = lastRole ? lastRole.role_id + 1 : 1;

        // Thêm role_id vào dữ liệu trước khi tạo
        const roleData = {
            role_id: newRoleId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const role = await Role.create(roleData);
        return res.status(201).json({
            message: "Create Role Done",
            data: role,
        });
    } catch (error) {
        console.error("Error creating Role:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};


// PUT / roles / :id

export const updateRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate({role_id:req.params.id}, req.body);
        if (!role) {
            return res.status(404).json({
                message: "role Not Found",
            });
        }
        return res.status(200).json({
            message: "Update role Done",
            data: role,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE / roles / :id

export const removeRole = async (req, res) => {
    try {
        const role = await Role.findOneAndDelete({role_id:req.params.id});
        if (!role) {
            return res.status(404).json({
                message: "role Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete role Done",
            data: role,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};