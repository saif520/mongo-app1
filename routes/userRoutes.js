const express=require('express');
const router=express.Router();

const { getAllUsers , getUserById, createUser , updateUser , deleteUser }=require('../controllers/UserControllers');

router.post('/create-user',createUser);
router.get('/get-all-users',getAllUsers);
router.get('/get-user-by-id/:userId',getUserById);
router.patch('/update-user/:id',updateUser);
router.delete('/delete-user/:id',deleteUser);

module.exports=router;