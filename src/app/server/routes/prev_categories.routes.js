const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { categoryDataUpload } = require('../config/prev_multer');

router.post('/create-categories', categoryDataUpload.fields([{ name: 'cate_img', maxCount: 1 }]), categoryController.createCategory);
router.get('/get-all-categories', categoryController.getCategories);
router.get('/get-all-sub-categories/:id', categoryController.getAllSubCategoryById);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryDataUpload.fields([{ name: 'cate_img', maxCount: 1 }]), categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;