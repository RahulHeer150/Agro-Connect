const express= require('express');
const router= express.Router();
const mapController= require('../controllers/mapcontroller');

router.get('/nearby-farmers', mapController.getNearbyFarmers);  


module.exports= router;