const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema();

const productSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    productPrice:{type:Number,required:true}
})

const ProductModel=mongoose.model('products',productSchema);

module.exports=ProductModel;