const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path')

const { handleAddFood, handleGetAllFoodList, handleDeleteById} = require('../controller/foodController');

const storage = multer.diskStorage({
    destination : "uploads",
    filename : function(req,file,cb) {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

// File filter to accept images only
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    //   res.status(400).json('Only image files are allowed!')
    }
  };

  const upload = multer({ storage : storage, fileFilter });




router.post('/add', upload.single('image'), handleAddFood);

router.get('/getAllFoodList', handleGetAllFoodList);

router.delete('/delete/:id', handleDeleteById);


module.exports = router;
