// import express from "express";
var express=require('express');


// module.exports=express;

    const configViewEngine = (app)=>{
        app.use(express.static('./src/assets')); // cho phép truy cập vào thư mục src/assets or xét quyền truy cập thư mục src/asstets
        app.set("view engine","ejs");
        app.set("views","./src/views");
    }

    // export default configViewEngine;

    module.exports=configViewEngine;
