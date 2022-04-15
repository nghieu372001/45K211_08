import express from "express";
import homeController from "../controller/homeController";


let router=express.Router();

const initWebRoute=(app)=>{

        router.get('/monitor', homeController.getHomepage); // Hiển thị ô tìm kiếm theo số điện thoại

        router.get('/booking', (req,res)=>{
            res.render('booking.ejs');     // chạy ra cái file booking.ejs
        })

        router.post('/addOrder',homeController.createNewOrder); // Thêm order

        router.post('/deleteOrder',homeController.deleteOrder);
        router.get('/editOrder/:idOrder',homeController.editOrder);
        router.post('/updateOrder',homeController.updateOrder);
        router.post('/searchOrder',homeController.searchOrder);
        router.get('/handerOrder', homeController.handerOrder);
        router.get('/listOrder', homeController.listOrder);
        router.post('/AdmindeleteOrder',homeController.AdmindeleteOrder);
        router.post('/AdmindeleteHanderOrder',homeController.AdmindeleteHanderOrder);
        router.post('/AdminUpdateOrder',homeController.AdminUpdateOrder);
        router.post('/hanldeLogin', homeController.hanldeLogin);
        router.get('/login', (req,res)=>{
            res.render('login.ejs');     // chạy ra cái file booking.ejs
        })

        router.get('/infoAdmin', (req,res)=>{
            res.render('infoAdmin.ejs');     // chạy ra cái file booking.ejs
        })

        router.get('/menu', homeController.menu);
        router.get('/handleMenu', homeController.handleMenu);

        router.post('/adminAddMenu',homeController.adminAddMenu);

        router.get('/adminEditMenu/:idMenu',homeController.adminEditMenu);
        router.post('/adminUpdateMenu',homeController.adminUpdateMenu);
        router.post('/adminDeleteMenu',homeController.adminDeleteMenu);


        router.get('/listOrderDetail/:idListOrder',homeController.listOrderDetail);

        return app.use('/',router);
}


export default initWebRoute;