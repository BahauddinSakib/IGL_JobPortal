const { default: slugify } = require("slugify");
const db = require("../config/dbConnect"); // Import your db connection
const fs = require("fs");
const path = require('path');
const { console } = require("inspector");

module.exports.createProduct = async (req, res) => {
  try {
    const mainImage = req.files?.mainImage?.[0];
    const galleryFiles = req.files?.thumbnails || [];

    const productData = JSON.parse(req.body.productData);

    // 1. Insert into pro_products
    const newProductBase = {
      pro_discount: parseInt(productData.discountAmount) || null,
      pro_has_discount:
        productData.discountAmount || productData.discountPercentage ? 1 : 0,
      pro_price: parseFloat(productData.price),
      pro_buy_price: parseFloat(productData.buyPrice) || null,
      pro_discount_percentage: parseInt(productData.discountPercentage) || null,
      pro_code: parseInt(productData.productCode),
      pro_category_id: parseInt(productData.category),
      pro_sub_category_id: parseInt(productData.subCategory) || null,
      pro_vendor_id: parseInt(productData.vendor_id) || null,
      pro_brand_id: parseInt(productData.brand_id) || null,
      pro_discount_expire: productData.discountExpire || null,
      pro_status: 2,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    };

    const [productInserted] = await db("pro_products")
      .insert(newProductBase)
      .returning("id");
    const productId = productInserted.id || productInserted; // depending on DB client

    const baseSlug = slugify(productData.name, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check for slug uniqueness
    while (true) {
      const existing = await db("pro_product_details")
        .where({ pd_slug: uniqueSlug })
        .first();

      if (!existing) break; // Unique slug found
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 2. Insert into pro_product_details
    const newProductDetails = {
      pd_product_id: productId,
      pd_title: productData.name,
      pd_slug: uniqueSlug,
      pd_description: productData.description || null,
      pd_model: productData.productModel || null,
      pd_thumbnail: mainImage ? mainImage.filename : null,
      pd_meta_title: productData.metaTitle || null,
      pd_meta_keyword: productData.tags?.join(",") || null,
      pd_meta_description: productData.metaDescription || null,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    };

    await db("pro_product_details").insert(newProductDetails);

    // 3. Save gallery images (including main image if exists)
    if (mainImage) galleryFiles.unshift(mainImage); // Include thumbnail in gallery

    if (galleryFiles.length > 0) {
      const galleryRecords = galleryFiles.map((file, index) => {
        if (file) {
          return {
            pro_img_name: file.filename,
            pro_img_product_id: productId,
            pro_img_status: 1,
            pro_img_position: index + 1,
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
          };
        }
      });
      await db("pro_images").insert(galleryRecords);
    }

    res
      .status(201)
      .json({ message: "Product created successfully", productId });
  } catch (err) {
    console.error("Product creation error:", err);
    res
      .status(500)
      .json({ message: "Failed to create product", error: err.message });
  }
};

module.exports.getAllProductsWithImages = async (req, res) => {
  try {
    const products = await db('pro_products as p')
      .join('pro_product_details as d', 'p.id', 'd.pd_product_id')
      .select(
        'p.id',
        'p.pro_has_discount',
        'p.pro_discount',
        'p.pro_discount_percentage',
        'p.pro_code',
        'p.pro_category_id',
        'p.pro_sub_category_id',
        'p.pro_vendor_id',
        'p.pro_brand_id',
        'p.pro_price',
        'p.pro_buy_price',
        'p.pro_status',
        'p.pro_discount_expire',
        'd.pd_title as pro_title',
        'd.pd_slug as pro_slug',
        'd.pd_description as pro_description',
        'd.pd_model as pro_model',
        'd.pd_thumbnail as pro_thumbnail',
        'd.pd_meta_title as pro_meta_title',
        'd.pd_meta_keyword as pro_meta_keyword',
        'd.pd_meta_description as pro_meta_description',
        'p.created_at as product_created_at',
        'p.updated_at as product_updated_at'
      );

    const productIds = products.map((product) => product.id);

    const images = await db('pro_images')
      .select('*')
      .whereIn('pro_img_product_id', productIds)
      .orderBy('pro_img_product_id');

    const imageMap = new Map();
    for (const img of images) {
      if (!imageMap.has(img.pro_img_product_id)) {
        imageMap.set(img.pro_img_product_id, []);
      }
      imageMap.get(img.pro_img_product_id).push({
        id: img.id,
        pro_img_name: img.pro_img_name,
        pro_img_status: img.pro_img_status,
        pro_img_position: img.pro_img_position,
        created_at: img.created_at,
        updated_at: img.updated_at,
      });
    }

    const result = products.map((product) => ({
      ...product,
      images: imageMap.get(product.id) || [],
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching product list with images:", error);
    res.status(500).json({ error: "Failed to fetch data", errorLog: error });
  }
};

module.exports.getAllProductsWithImagesByVendorId = async (req, res) => {
  const vendorId = req.params.id
  try {
    const products = await db('pro_products as p')
      .join('pro_product_details as d', 'p.id', 'd.pd_product_id')
      .where('pro_vendor_id', vendorId)
      .select(
        'p.id',
        'p.pro_has_discount',
        'p.pro_discount',
        'p.pro_discount_percentage',
        'p.pro_code',
        'p.pro_category_id',
        'p.pro_sub_category_id',
        'p.pro_vendor_id',
        'p.pro_brand_id',
        'p.pro_price',
        'p.pro_buy_price',
        'p.pro_status',
        'p.pro_discount_expire',
        'd.pd_title as pro_title',
        'd.pd_slug as pro_slug',
        'd.pd_description as pro_description',
        'd.pd_model as pro_model',
        'd.pd_thumbnail as pro_thumbnail',
        'd.pd_meta_title as pro_meta_title',
        'd.pd_meta_keyword as pro_meta_keyword',
        'd.pd_meta_description as pro_meta_description',
        'p.created_at as product_created_at',
        'p.updated_at as product_updated_at'
      );

    const productIds = products.map((product) => product.id);

    const images = await db('pro_images')
      .select('*')
      .whereIn('pro_img_product_id', productIds)
      .orderBy('pro_img_product_id');

    const imageMap = new Map();
    for (const img of images) {
      if (!imageMap.has(img.pro_img_product_id)) {
        imageMap.set(img.pro_img_product_id, []);
      }
      imageMap.get(img.pro_img_product_id).push({
        id: img.id,
        pro_img_name: img.pro_img_name,
        pro_img_status: img.pro_img_status,
        pro_img_position: img.pro_img_position,
        created_at: img.created_at,
        updated_at: img.updated_at,
      });
    }

    const result = products.map((product) => ({
      ...product,
      images: imageMap.get(product.id) || [],
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching product list with images:", error);
    res.status(500).json({ error: "Failed to fetch data", errorLog: error });
  }
};

module.exports.getAllProductsWithImagesByStatus = async (req, res) => {
  const status = req.params.status
  try {
    const products = await db('pro_products as p')
      .join('pro_product_details as d', 'p.id', 'd.pd_product_id')
      .where("pro_status" , status)
      .select(
        'p.id',
        'p.pro_has_discount',
        'p.pro_discount',
        'p.pro_discount_percentage',
        'p.pro_code',
        'p.pro_category_id',
        'p.pro_sub_category_id',
        'p.pro_vendor_id',
        'p.pro_brand_id',
        'p.pro_price',
        'p.pro_buy_price',
        'p.pro_status',
        'p.pro_discount_expire',
        'd.pd_title as pro_title',
        'd.pd_slug as pro_slug',
        'd.pd_description as pro_description',
        'd.pd_model as pro_model',
        'd.pd_thumbnail as pro_thumbnail',
        'd.pd_meta_title as pro_meta_title',
        'd.pd_meta_keyword as pro_meta_keyword',
        'd.pd_meta_description as pro_meta_description',
        'p.created_at as product_created_at',
        'p.updated_at as product_updated_at'
      );

    const productIds = products.map((product) => product.id);

    const images = await db('pro_images')
      .select('*')
      .whereIn('pro_img_product_id', productIds)
      .orderBy('pro_img_product_id');

    const imageMap = new Map();
    for (const img of images) {
      if (!imageMap.has(img.pro_img_product_id)) {
        imageMap.set(img.pro_img_product_id, []);
      }
      imageMap.get(img.pro_img_product_id).push({
        id: img.id,
        pro_img_name: img.pro_img_name,
        pro_img_status: img.pro_img_status,
        pro_img_position: img.pro_img_position,
        created_at: img.created_at,
        updated_at: img.updated_at,
      });
    }

    const result = products.map((product) => ({
      ...product,
      images: imageMap.get(product.id) || [],
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching product list with images:", error);
    res.status(500).json({ error: "Failed to fetch data", errorLog: error });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    // Step 1: Get combined product info by joining pro_products and pro_product_details
    const products = await db("pro_products as p")
      .join("pro_product_details as d", "p.id", "d.pd_product_id")
      .select(
        "p.id",
        "p.pro_has_discount",
        "p.pro_discount",
        "p.pro_discount_percentage",
        "p.pro_code",
        "p.pro_category_id",
        "p.pro_sub_category_id",
        "p.pro_vendor_id",
        "p.pro_status",
        "p.pro_brand_id",
        "p.pro_price",
        "p.pro_buy_price",
        "p.pro_status",
        "p.pro_discount_expire",
        "d.pd_title as pro_title",
        "d.pd_slug as pro_slug",
        "d.pd_description as pro_description",
        "d.pd_model as pro_model",
        "d.pd_thumbnail as pro_thumbnail",
        "d.pd_meta_title as pro_meta_title",
        "d.pd_meta_keyword as pro_meta_keyword",
        "d.pd_meta_description as p_meta_description",
        "p.created_at as product_created_at",
        "p.updated_at as product_updated_at"
      )
      .where("p.id", req.params.id);

    // Step 2: Fetch all images
    const images = await db("pro_images").select("*");

    // Step 3: Map images to each product by matching pro_img_product_id
    const productMap = products.map((product) => {
      const relatedImages = images.filter(
        (img) => img.pro_img_product_id === product.id
      );
      return {
        ...product,
        images: relatedImages,
      };
    });

    res.status(200).json(productMap);
  } catch (error) {
    console.error("Error fetching pending product list with images:", error);
    res.status(500).json({ errorInFo: error });
  }
};




const productFolder = path.join(__dirname, "..", "../uploads", "products"); // adjust as needed

module.exports.editProduct = async (req, res) => {
  try {
    const productId = req.body.productId;
    const mainImage = req.files?.mainImage?.[0];
    const galleryFiles = req.files?.thumbnails || [];
    const productData = JSON.parse(req.body.productData);

    const updatedBase = {
      pro_discount: parseInt(productData.discountAmount) || null,
      pro_has_discount: productData.discountAmount || productData.discountPercentage ? 1 : 0,
      pro_price: parseFloat(productData.price),
      pro_buy_price: parseFloat(productData.buyPrice) || null,
      pro_discount_percentage: parseInt(productData.discountPercentage) || null,
      pro_code: parseInt(productData.productCode),
      pro_category_id: parseInt(productData.category),
      pro_sub_category_id: parseInt(productData.subCategory) || null,
      pro_vendor_id: parseInt(productData.vendor_id) || null,
      pro_brand_id: parseInt(productData.brand_id) || null,
      pro_discount_expire: productData.discountExpire || null,
      updated_at: db.fn.now(),
    };

    await db('pro_products').where('id', productId).update(updatedBase);

    const baseSlug = slugify(productData.name, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await db("pro_product_details")
        .whereNot({ pd_product_id: productId })
        .andWhere({ pd_slug: uniqueSlug })
        .first();
      if (!existing) break;
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const updatedDetails = {
      pd_title: productData.name,
      pd_slug: uniqueSlug,
      pd_description: productData.description || null,
      pd_model: productData.productModel || null,
      pd_meta_title: productData.metaTitle || null,
      pd_meta_keyword: productData.tags?.join(",") || null,
      pd_meta_description: productData.metaDescription || null,
      updated_at: db.fn.now(),
    };

    // ✅ Update main image if provided
    if (mainImage) {
      updatedDetails.pd_thumbnail = mainImage.filename;

      const existingMain = await db('pro_images')
        .where('pro_img_product_id', productId)
        .andWhere('pro_img_position', 1)
        .first();

      if (existingMain) {
        const oldMainPath = path.join(productFolder, existingMain.pro_img_name);
        if (fs.existsSync(oldMainPath)) fs.unlinkSync(oldMainPath);

        await db('pro_images')
          .where('id', existingMain.id)
          .update({
            pro_img_name: mainImage.filename,
            updated_at: db.fn.now(),
          });
      } else {
        await db('pro_images').insert({
          pro_img_product_id: productId,
          pro_img_name: mainImage.filename,
          pro_img_position: 1,
          pro_img_status: 1,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        });
      }
    }

    await db('pro_product_details')
      .where('pd_product_id', productId)
      .update(updatedDetails);

    // ✅ Update or insert gallery images and delete replaced ones
    if (galleryFiles.length > 0) {
      const existingGalleryImages = await db('pro_images')
        .where('pro_img_product_id', productId)
        .andWhere('pro_img_position', '>', 1);

      const incomingPositions = galleryFiles.map(f => parseInt(f.positions));

      for (const file of galleryFiles) {
        const position = parseInt(file.positions);
        const existingImage = existingGalleryImages.find(img => img.pro_img_position === position);

        if (existingImage) {
          const oldPath = path.join(productFolder, existingImage.pro_img_name);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

          await db('pro_images')
            .where('id', existingImage.id)
            .update({
              pro_img_name: file.filename,
              updated_at: db.fn.now(),
            });
        } else {
          await db('pro_images').insert({
            pro_img_product_id: productId,
            pro_img_name: file.filename,
            pro_img_position: position,
            pro_img_status: 1,
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
          });
        }
      }

      // Optional: delete unused images (positions not submitted)
      const unusedImages = existingGalleryImages.filter(
        img => incomingPositions.includes(img.pro_img_position)
      );
      if (unusedImages.length) {
        for (const img of unusedImages) {
          const imgPath = path.join(productFolder, img.pro_img_name);
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }
      }
    }

    res.json({ message: 'Product updated successfully', productId });
  } catch (err) {
    console.error('Edit product error:', err);
    res.status(500).json({ message: 'Failed to update product', error: err.toString() });
  }
};

module.exports.deleteProductImage = async (req, res) => {
  try {
    const productId = req.params.id;
    const { fileName, position } = req.body;


    // 1. Delete from DB
    const deleted = await db('pro_images')
      .where('pro_img_product_id', productId)
      .andWhere('pro_img_position', position)
      .del();

    if (deleted === 0) {
      return res.status(404).json({ message: 'Image not found in DB' });
    }

    // 2. Delete image file
    const filePath = path.join(productFolder, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Delete product image error:', err);
    res.status(500).json({ message: 'Failed to delete image', error: err.message });
  }
};


module.exports.changeProductStatus = async (req, res) => {
  const { product_id, admin_id, status } = req.body;

  try {
    // Validate status value
    if (![0, 1, 2].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Use 0, 1, or 2." });
    }

    // Check if admin_id exists in users table
    const adminExists = await db('user')
  .where({ id: admin_id, u_role: 0 })
  .first();

    if (!adminExists) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    // Check if product exists
    const product = await db('pro_products')
      .where({ id: product_id })
      .first();

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update pro_status
    await db('pro_products')
      .where({ id: product_id })
      .update({
        pro_status: status,
        updated_at: db.fn.now(),
      });

    res.status(200).json({
      message: "Product status updated successfully.",
      product_id,
      updated_status: status,
    });

  } catch (error) {
    console.error("Error updating product status:", error);
    res.status(500).json({ message: "Internal server error", errorLog: error });
  }
};

