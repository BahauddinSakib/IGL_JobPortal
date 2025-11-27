const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");



// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Max size = 5MB
const maxSize = 5 * 1024 * 1024;


// === Site Data Upload Setup ===
const siteDataFolder = path.join(__dirname, "..", "../uploads", "site-data");
if (!fs.existsSync(siteDataFolder)) fs.mkdirSync(siteDataFolder, { recursive: true });
const siteDataStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, siteDataFolder);
  },
  filename: function (req, file, cb) {
    let fieldLabel = "site-data";
    if (file.fieldname === "sd_logo") fieldLabel = "sd_logo";
    else if (file.fieldname === "sd_banner") fieldLabel = "sd_banner";

    const fileName = `${fieldLabel}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});
const siteDataUpload = multer({
  storage: siteDataStorage,
  limits: { fileSize: maxSize },
  fileFilter,
});
const compressSiteDataImages = async (req, res, next) => {
  try {
    const files = [
      ...(req.files?.sd_logo || []),
      ...(req.files?.sd_banner || [])
    ];

    const compressAndReplace = async (file, width = 400, height = 400) => {
      const originalPath = path.join(siteDataFolder, file.filename);
      const baseName = path.parse(file.filename).name;
      const webpPath = path.join(siteDataFolder, `${baseName}.webp`);

      await sharp(originalPath)
        .resize(width, height, {
          fit: "inside",
          withoutEnlargement: true
        })
        .webp({ quality: 50 })
        .toFile(webpPath);

      if (fs.existsSync(originalPath)) {
        try {
          fs.unlinkSync(originalPath);
        } catch (err) {
          console.warn(`Failed to unlink original file: ${file.filename}`, err);
        }
      }

      file.filename = `${baseName}.webp`;
      file.path = webpPath;
      file.originalname = file.originalname.replace(/\.[^/.]+$/, ".webp");
    };

    for (const file of files) {
      await compressAndReplace(
        file,
        file.fieldname === "sd_banner" ? 1600 : 400,
        file.fieldname === "sd_logo" ? 70 : 70
      );
    }

    const oldFiles = [req.body.oldLogo, req.body.oldBanner].filter(Boolean);

    oldFiles.forEach((oldFile) => {
      const oldPath = path.join(siteDataFolder, oldFile);
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
        } catch (err) {
          console.warn(`Failed to delete old image ${oldFile}:`, err);
        }
      }
    });

    next();
  } catch (err) {
    console.error("Site data image compression failed:", err);
    next(err);
  }
};


// === Category Data Upload Setup ===
const categoryDataFolder = path.join(__dirname, "..", "../uploads", "category-data");
if (!fs.existsSync(categoryDataFolder)) fs.mkdirSync(categoryDataFolder, { recursive: true });
const categoryDataStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, categoryDataFolder);
  },
  filename: function (req, file, cb) {
    let fieldLabel = "ct_image";
    if (file.fieldname === "cate_img") fieldLabel = "ct_image";
    const fileName = `${fieldLabel}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const categoryDataUpload = multer({
  storage: categoryDataStorage,
  limits: { fileSize: maxSize },
  fileFilter,
});


// === Brand Data Upload Setup ===
const brandDataFolder = path.join(__dirname, "..", "../uploads", "brand-data");
if (!fs.existsSync(brandDataFolder)) fs.mkdirSync(brandDataFolder, { recursive: true });
const brandDataStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, brandDataFolder);
  },
  filename: function (req, file, cb) {
    const fieldLabel = file.fieldname === "b_logo" ? "br_logo" : "brand";
    const timestamp = Date.now();
    const fileName = `${fieldLabel}-${timestamp}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const brandDataUpload = multer({
  storage: brandDataStorage,
  limits: { fileSize: maxSize },
  fileFilter,
});

const compressBrandFieldsImage = async (req, res, next) => {
  try {
    const fileArray = req.files?.b_logo;
    if (!fileArray || fileArray.length === 0) return next();
    const file = fileArray[0];
    const originalPath = path.join(brandDataFolder, file.filename);
    const baseName = path.parse(file.filename).name;
    const webpPath = path.join(brandDataFolder, `${baseName}.webp`);
    await sharp(originalPath)
      .resize(200, 200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(webpPath);
    fs.unlinkSync(originalPath);
    file.filename = `${baseName}.webp`;
    file.path = webpPath;
    file.originalname = file.originalname.replace(/\.[^/.]+$/, ".webp");
    next();
  } catch (err) {
    console.error("Image compression failed:", err);
    next(err);
  }
};


// === Product Upload Setup ===
const productFolder = path.join(__dirname, "..", "../uploads", "products");
if (!fs.existsSync(productFolder)) fs.mkdirSync(productFolder, { recursive: true });

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productFolder);
  },
  filename: function (req, file, cb) {
    const rawName = req.body.productTitle || "product";
    const productNameForFile = rawName.replace(/\s+/g, "-").toLowerCase();
    const fileName = `${productNameForFile}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});
const productImageUpload = multer({
  storage: productStorage,
  limits: { fileSize: maxSize },
  fileFilter,
});
const upload = multer({
  storage: productStorage,
  limits: { fileSize: maxSize },
  fileFilter,
});






const compressProductImages = async (req, res, next) => {
  try {
    const mainImage = req.files?.mainImage?.[0];
    const galleryImages = req.files?.thumbnails || [];
    const compressAndReplace = async (file) => {
      const originalPath = path.join(productFolder, file.filename);
      const baseName = path.parse(file.filename).name;
      const webpPath = path.join(productFolder, `${baseName}.webp`);
      await sharp(originalPath)
        .resize(800, 800, {
          fit: "inside",
          withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(webpPath);
      fs.unlinkSync(originalPath);
      file.filename = `${baseName}.webp`;
      file.path = webpPath;
      file.originalname = file.originalname.replace(/\.[^/.]+$/, ".webp");
    };
    if (mainImage) await compressAndReplace(mainImage);
    for (const file of galleryImages) {
      await compressAndReplace(file);
    }
    next();
  } catch (err) {
    console.error("Product image compression failed:", err);
    next(err);
  }
};
const compressAndReplaceProductImage = async (req, res, next) => {
  try {
    const mainImage = req.files?.mainImage?.[0];
    const galleryImages = req.files?.thumbnails || [];
    let positions = req.body.thumbnailPositions;
    if (!Array.isArray(positions)) {
      positions = positions ? [positions] : [];
    }
    const compressAndReplace = async (file) => {
      if (!file || !file.filename) return;
      const originalPath = path.join(productFolder, file.filename);
      const baseName = path.parse(file.filename).name;
      const webpPath = path.join(productFolder, `${baseName}.webp`);
      await sharp(originalPath)
        .resize(800, 800, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(webpPath);
      fs.unlinkSync(originalPath);
      file.filename = `${baseName}.webp`;
      file.path = webpPath;
      file.originalname = file.originalname.replace(/\.[^/.]+$/, ".webp");
    };
    if (mainImage) await compressAndReplace(mainImage);
    for (let i = 0; i < galleryImages.length; i++) {
      const file = galleryImages[i];
      const position = positions[i];
      if (position !== undefined) {
        file.positions = parseInt(position);
      }
      await compressAndReplace(file);
    }
    next();
  } catch (err) {
    console.error("Product image compression failed:", err);
    res.status(500).json({ message: "Image compression error", error: err.toString() });
  }
};


module.exports = {
  multer,
  upload,
  siteDataUpload,
  categoryDataUpload,
  brandDataUpload,
  productImageUpload,
  compressBrandFieldsImage,
  compressProductImages,
  compressSiteDataImages,
  compressAndReplaceProductImage,
};
