const db = require("../config/dbConnect");

module.exports.createBrand = async (req, res, next) => {
    try {
        const { b_name, b_description } = req.body;
        const b_logo = req.files?.b_logo[0].filename;
        const [insertId] = await db("pro_brands").insert({
            b_name,
            b_description,
            b_logo,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        });
    const newBrand = await db("pro_brands").where({ id: insertId }).first();
    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: newBrand,
      errorLog: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create brand",
      data: null,
      errorLog: error.message
    });
  }
};

module.exports.getBrands = async (req, res, next) => {
  try {
    const allBrands = await db("pro_brands").select("*");
    res.status(200).json({
      success: true,
      message: "All brands fetched successfully",
      data: allBrands,
      errorLog: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch brands",
      data: null,
      errorLog: error.message
    });
  }
};

module.exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await db("pro_brands").where({ id }).first();
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
        data: null,
        errorLog: null
      });
    }
    res.status(200).json({
      success: true,
      message: "Brand fetched successfully",
      data: brand,
      errorLog: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch brand",
      data: null,
      errorLog: error.message
    });
  }
};

module.exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { b_name, b_description, b_logo } = req.body;
    const updatedCount = await db("pro_brands")
      .where({ id })
      .update({
        b_name,
        b_description,
        b_logo,
        updated_at: db.fn.now()
      });
    if (updatedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
        data: null,
        errorLog: null
      });
    }
    const updatedBrand = await db("pro_brands").where({ id }).first();
    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand,
      errorLog: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update brand",
      data: null,
      errorLog: error.message
    });
  }
};

module.exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await db("pro_brands").where({ id }).del();
    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
        data: null,
        errorLog: null
      });
    }
    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
      data: null,
      errorLog: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete brand",
      data: null,
      errorLog: error.message
    });
  }
};
