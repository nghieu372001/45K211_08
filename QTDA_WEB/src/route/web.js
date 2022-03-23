import express from "express";
import homeController from "../controller/homeController";


let router=express.Router();

const initWebRoute=(app)=>{

        router.get('/booking', (req,res)=>{
            res.render('booking.ejs');     // chạy ra cái file booking.ejs
        })

        router.post('/addOrder',homeController.createNewOrder); // Thêm order



        return app.use('/',router);
}


export default initWebRoute;