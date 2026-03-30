const express= require('express');
const router= express.Router();
const mapController= require('../controllers/mapcontroller');

router.get('/nearby', mapController.getNearbyFarmers);  


module.exports= router;