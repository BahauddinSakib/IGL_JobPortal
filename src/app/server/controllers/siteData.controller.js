const db = require("../config/dbConnect");
const path = require("path");
const fs = require("fs");
const siteDataFolder = path.join(__dirname, "..", "../uploads", "site-data");

// Create Site Data
module.exports.createSiteData = async (req, res) => {
  try {
    const { sd_mobile_number, sd_slogan } = req.body;
    const sd_logo = req.files?.sd_logo?.[0]?.filename || null;
    const sd_banner = req.files?.sd_banner?.[0]?.filename || null;

    const existingData = await db("sitedata").first();
    if (existingData) {
      return res.status(400).json({
        message: "Site data already exists. Only one entry is allowed.",
      });
    }
    const [insertedId] = await db("sitedata").insert({
      sd_logo,
      sd_banner,
      sd_mobile_number,
      sd_slogan,
    });
    const insertedData = await db("sitedata").where({ id: insertedId }).first();
    res.status(201).json({
      message: "Site data created successfully.",
      data: insertedData,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Internal server error", errorLog: error });
  }
};

// Get Site Data
module.exports.getSiteData = async (req, res) => {
  try {
    const sitedata = await db("sitedata").first();

    if (!sitedata) {
      return res.status(404).json({ message: "Site data not found" });
    }

    res.status(200).json(sitedata);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Internal server error HIT", errorLog: error });
  }
};

// Update Site Data
module.exports.updateSiteData = async (req, res) => {
  console.log("Hitting in update controller");
  try {
    const { sd_mobile_number, sd_slogan } = req.body;
    const sd_logo = req.files?.sd_logo?.[0]?.filename;
    const sd_banner = req.files?.sd_banner?.[0]?.filename;

    const updateData = {
      sd_mobile_number,
      sd_slogan,
    };
    if (sd_logo) updateData.sd_logo = sd_logo;
    if (sd_banner) updateData.sd_banner = sd_banner;

    const updated = await db("sitedata").update(updateData);

    if (!updated) {
      return res.status(404).json({ message: "Site data not found" });
    }

    const latestData = await db("sitedata").first();

    res.status(200).json({
      message: "Site data updated successfully.",
      data: latestData,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Site Data
module.exports.deleteSiteData = async (req, res) => {
  try {
    const existingData = await db("sitedata").first();
    if (!existingData) {
      return res.status(404).json({ message: "Site data not found" });
    }

    // === Delete associated image files ===
    const siteDataFolder = path.join(__dirname, "..", "../uploads", "site-data");

    const imageFields = ["sd_logo", "sd_banner"];

    for (const field of imageFields) {
      const fileName = existingData[field];
      if (fileName) {
        const filePath = path.join(siteDataFolder, fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    // === Delete DB record ===
    await db("sitedata").where({ id: existingData.id }).del();

    res.status(200).json({ message: "Site data deleted successfully." });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};