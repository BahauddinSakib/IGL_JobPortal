const express = require('express');
const router = express.Router();
const siteDataController = require('../controllers/siteData.controller');
const { siteDataUpload, compressSiteDataImages } = require('../config/multer');



router.post('/create-site-data',siteDataUpload.fields([{ name: 'sd_logo', maxCount: 1 },{ name: 'sd_banner', maxCount: 1 }]), compressSiteDataImages, siteDataController.createSiteData);
router.get('/get-site-data', siteDataController.getSiteData);
router.put('/update-site-data',siteDataUpload.fields([{ name: 'sd_logo', maxCount: 1 },{ name: 'sd_banner', maxCount: 1 }]), compressSiteDataImages, siteDataController.updateSiteData);
router.delete('/delete-site-data', siteDataController.deleteSiteData);
module.exports = router;