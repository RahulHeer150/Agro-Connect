const Farmer= require("../models/farmermodel");

exports.findNearbyFarmers=async(lng, lat,maxDistance)=>{
    return await Farmer.find({
        location:{
            $near:{
                $geometry:{
                    type:"Point",
                    coordinates:[lng,lat] // Example coordinates (longitude, latitude)
        },
        $maxDistance:maxDistance ,// Maximum distance in meters
    }
    }
});
}