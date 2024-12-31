const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema();

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true}
})

const UserModel=mongoose.model('users',userSchema);

module.exports=UserModel;