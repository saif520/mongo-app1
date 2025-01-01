const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const userRoutes=require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes');


const app=express();

const PORT=process.env.PORT;
const DB_URL=process.env.DB_URL;

app.use(cors());
app.use(express.json());

app.use('/api',userRoutes);
app.use('/api/product',productRoutes);



mongoose.connect(DB_URL).then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log(err);
})























app.get('/',(req,res)=>{
    res.send(`
            <h1>Saifuddin Dhali</h1>
        `)
})

app.listen(PORT,(req,res)=>{
    try{
        console.log(`server started at http://localhost:${PORT}`);
    }
    catch(err){
        console.error("Not Found");
        res.status(404).send(err);
    }
})