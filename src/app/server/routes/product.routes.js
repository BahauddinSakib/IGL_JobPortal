const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { upload, productImageUpload, compressProductImages, compressAndReplaceProductImage } = require('../config/multer');
const verifyToken = require('../middleware/verifyToken');

router.post(
  '/create-products',
  productImageUpload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'thumbnails' }
  ]),
  compressProductImages,
  productController.createProduct
);
router.get('/product-list', productController.getAllProductsWithImages);
router.get('/vendor-product-list/:id', verifyToken, productController.getAllProductsWithImagesByVendorId);
router.get('/product-list-by-status/:status', productController.getAllProductsWithImagesByStatus);
router.get('/product-details/:id', productController.getProductById);
router.put('/product-approve', verifyToken, productController.changeProductStatus);
router.put(
  '/products-edit',
  verifyToken,
  productImageUpload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'thumbnails' }
  ]),
  compressAndReplaceProductImage,
  productController.editProduct
);
router.delete('/product-image-delete/:id', productController.deleteProductImage);
// router.delete('/products/:id', productController.deleteProduct);

module.exports = router;