const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { brandDataUpload, compressBrandFieldsImage } = require('../config/prev_multer');

router.post('/add-brand', brandDataUpload.fields([{ name: 'b_logo', maxCount: 1 }]),compressBrandFieldsImage, brandController.createBrand);
router.get('/get-all-brands', brandController.getBrands);
router.get('/brands/:id', brandController.getBrandById);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands/:id', brandController.deleteBrand);

module.exports = router;