const {mongoose, Schema, model} = require('mongoose')

const FoodSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    description : {
        type : String,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    catagory : {
        type : String,
        require : true
    },
    TagLine : {
        type : String,
        enum : ["Top dishes near you", "All Dishes"],
        require : true,
    }
},{timestamps : true});

const FoodModel = mongoose.models.Food || mongoose.model("Food",FoodSchema);

module.exports = FoodModel



