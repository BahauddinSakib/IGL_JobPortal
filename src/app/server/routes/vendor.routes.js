const express = require('express');
const router = express.Router();
const vendorControllers = require('../controllers/vendor.controller');
const { vendorDocsUpload } = require('../config/multer');

router.get('/all-vendors', vendorControllers.getAllVendors);
router.post(
  '/vendors-register',
  vendorDocsUpload.fields([
  { name: 'license', maxCount: 1 },
  { name: 'taxCertificate', maxCount: 1 },
  { name: 'idDocument', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
]), vendorControllers.createVendor)
router.get('/vendor-details/:id', vendorControllers.getVendorById);


module.exports = router;
