import Description from "../models/description";

 // GET / Descipions
 export const getAllDescripions = async (req, res) => {
    try {
        const descipions = await Description.find();
        return res.status(200).json({
            message: "Get All Descipions Done",
            data: descipions,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


 // GET /Descipions/ : id
export const getDescriptionDetail = async (req, res) => {
    try {
        const description = await Description.findOne({description_id:req.params.id});
        if (!description) {
            return res.status(404).json({
                message: "Description Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Description Detail Done",
            data: description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDescriptionDetailIds = async (req, res) => {
    try {
      // Log tham số ids từ URL
      console.log("Received params:", req.params);
  
      const idsParam = req.params.ids;
  
      if (!idsParam) {
        return res.status(400).json({ message: "IDs parameter is required" });
      }
  
      console.log("Received IDs:", idsParam); // Log tham số nhận được từ frontend
  
      const ids = idsParam.split(","); // Tách chuỗi "1,2,3" thành mảng ["1", "2", "3"]
  
      const descriptions = await Description.find({
        description_id: { $in: ids },
      });
  
      if (descriptions.length === 0) {
        return res.status(404).json({
          message: "Descriptions Not Found",
        });
      }
  
      return res.status(200).json({
        message: "Get Descriptions Done",
        data: descriptions,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

 // POST /Descipions
export const addDescription = async (req, res) => {
     console.log("Received data:", req.body);
    try {
       
        // Tìm danh mục cuối cùng để lấy Description_id
        const lastDescription = await Description.findOne({}, {}, { sort: { description_id: -1 } });

        //
        const newDescriptionId = lastDescription ? lastDescription.description_id + 1 : 1;

         // Thêm Description_id vào dữ liệu trước khi tạo
        const DescriptionData = {
            description_id: newDescriptionId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const description = await Description.create(DescriptionData);

        return res.status(201).json({
            message: "Create Description Done",
            data: description,   
        });
    } catch (error) {
        console.error("Error creating Description:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / Descipions / :id

 export const updateDescription = async (req, res) => {
    try {
        const description = await Description.findOneAndUpdate(
            { description_id: req.params.id },
            req.body, { new: true }
        );
        if (!description) {
            return res.status(404).json({
                message: "Description Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Description Done",
            data: description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / Descipions / :id

export const removeDescription = async (req, res) => {
    try {
        const description = await Description.findOneAndDelete({description_id:req.params.id});
        if (!description) {
            return res.status(404).json({
                message: "Description Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Description Done",
            data: description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
