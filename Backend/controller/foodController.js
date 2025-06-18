const FoodModel = require('../models/FoodModel');
const fs = require('fs');
const path = require('path');

const handleAddFood = async (req, res) => {
    try {
        const { name, description, price, catagory } = req.body;
        console.log('catagory',catagory)

        const createFood = await FoodModel.create({
            name,
            description,
            price,
            catagory,
            image: `/uploads/${req.file.filename}`, // ✅ Corrected
        });
        console.log(createFood);
        res.status(201).json({
            success: true,
            data: 'Food Added Successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: true,
            message: 'Internal server error',
         });
    }
};

const handleGetAllFoodList = async (req,res) => {
    const AllList = await FoodModel.find({});
    try {
     res.status(200).json({ 
        success : true,
        data : AllList,
     });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error' });
    }
}


const handleDeleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const FoodItem = await FoodModel.findById(id);

    if (!FoodItem) {
      return res.status(404).json({ success: false, data: 'Item not found' });
    }

    const imagePath = path.join(__dirname, '..', FoodItem.image);
    // console.log('Image path:', imagePath);

    // First delete the DB item
    await FoodModel.findByIdAndDelete(id);

    // Then delete the image safely
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        // console.log('Image deleted successfully');
      }
    });

    res.status(200).json({ success: true, data: 'Deleted Successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




module.exports = {
    handleAddFood,
    handleGetAllFoodList,
    handleDeleteById,
};

