const db = require("../config/dbConnect"); // Import your db connection

// Create a new category
module.exports.createCategory = async (req, res, next) => {
  try {
    const { c_name, c_slug, c_description, content_description, cat_meta_keys, parent_id } = req.body;

    // Access uploaded file
    const cate_img = req.files?.cate_img?.[0];
//     let cate_img = null;
//     if (req.files?.cate_img?.[0]) {
//   await processImage(req.files.cate_img[0]); // ✅ Pass the actual file object
//   cate_img = req.files.cate_img[0];
// }


    const [newCategory] = await db('pro_category')
      .insert({
        pro_cat_name: c_name,
        pro_cat_slug: c_slug,
        pro_cat_description: c_description,
        pro_cat_content_description: content_description,
        pro_cat_meta_keys: cat_meta_keys,
        pro_cat_parent_id: parent_id ? parent_id : null,
        pro_cat_img: cate_img ? cate_img.filename : null,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      })
      .returning('*');

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error', errorLog: error.message });
  }
};


// Get all categories
module.exports.getCategories = async (req, res, next) => {
  try {
    // Fetch all categories from the database
    const allCategories = await db('pro_category').select('*');
    
    // Create a map for quick lookup and an array for root categories
    const categoryMap = {};
    const hierarchicalCategories = [];
    
    // First pass: create map entries
    allCategories.forEach(category => {
      category.subcategories = []; // Initialize subcategories array
      categoryMap[category.id] = category;
    });
    
    // Second pass: build hierarchy
    allCategories.forEach(category => {
      if (category.pro_cat_parent_id && categoryMap[category.pro_cat_parent_id]) {
        // If it has a parent, add it to the parent's subcategories
        categoryMap[category.pro_cat_parent_id].subcategories.push(category);
      } else {
        // Otherwise add to root level
        hierarchicalCategories.push(category);
      }
    });
    
    res.status(200).json(hierarchicalCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get a single category by ID
module.exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await db('pro_category')
      .where({ id })
      .first();
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const childCategories = await db('pro_category')
      .where({ pro_cat_parent_id: id });
    const response = {
      ...category,
      children: childCategories.length > 0 ? childCategories : null
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', errorLog: error });
  }
};


module.exports.getAllSubCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await db('pro_category')
      .select('*') 
      .where({ pro_cat_parent_id: id })

    if (!category) {
      return res.status(404).json({ message: 'Sub category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', errorLog: error });
  }
};

module.exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      c_name,
      c_slug,
      c_description,
      content_description,
      cat_meta_keys,
      parent_id
    } = req.body;
    const cate_img = req.files?.cate_img?.[0];
    // First get the current category to handle image updates properly
    const currentCategory = await db('pro_category')
      .where({ id })
      .first();
    if (!currentCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // Prepare update data
    const updateData = {
      pro_cat_name: c_name,
      pro_cat_slug: c_slug,
      pro_cat_description: c_description,
      pro_cat_content_description: content_description,
      pro_cat_meta_keys: cat_meta_keys,
      pro_cat_parent_id: parent_id ? parent_id : null,
      updated_at: db.fn.now()
    };
    // Only update image if a new one was provided
    if (cate_img) {
      updateData.pro_cat_img = cate_img.filename;
      // Here you might want to delete the old image file from storage
    }
    // Perform the update
    const updatedRows = await db('pro_category')
      .where({ id })
      .update(updateData);
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Category not updated' });
    }
    // Fetch the updated category
    const updatedCategory = await db('pro_category')
      .where({ id })
      .first();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      message: 'Internal server error',
      errorLog: error
    });
  }
};



// Delete a category
module.exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await db('pro_category')
      .where({ id })
      .del();
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', errorLog:error });
  }
};