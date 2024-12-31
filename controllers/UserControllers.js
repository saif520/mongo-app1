const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/User.model');

// Controller to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        console.log('Fetched Users:', users);
        res.status(200).json(users); // Respond with JSON and status 200
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server Error', error: err.message }); // Respond with error
    }
};


exports.getUserById=async(req,res)=>{
    try{
        const {userId}=req.params;
        const user=await UserModel.findById(userId);
        if(!user){
            res.status(404).json({message:'user not found'});
            return;
        }
        console.log('Fetched User:',user);
        return res.status(200).json(user);
    }
    catch(err){
        console.error('Error fetching users:',err);
        return res.status(500).json({message:'Server Error',error:err.message});
    }
}


exports.createUser=async(req,res)=>{
    try{
        const data=req.body;
        const user=new UserModel(data);
        const result=await user.save();
        console.log("new user created",result);
        return res.status(200).json(result);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:'Server Error',error:err.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Use $set operator to update fields
        const user = await UserModel.findByIdAndUpdate(
            id,
            { $set: data },  // Correct use of $set
            { new: true } // Return updated document and enforce validation
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Use 404 for not found
        }

        console.log("Updated user:", user);
        return res.status(200).json({ message: "User updated", data: user });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};


exports.deleteUser=async(req,res)=>{
    try{
        const { id }=req.params;
        const user=await UserModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        else{
            console.log(user);
            return res.json({message:"user deleted"});
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Server Error",error:err.message});
    }
}