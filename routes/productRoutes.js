const express=require('express');
const router=express.Router();
const {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}=require('../controllers/ProductControllers');


router.post('/create-product',createProduct);
router.get('/get-all-products',getAllProducts);
router.get('/get-product-by-id/:pId',getProductById);
router.patch('/update-product/:id',updateProduct);
router.delete('/delete-product/:id',deleteProduct);


module.exports=router;