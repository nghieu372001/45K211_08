import { addListener } from "nodemon";
import pool from "../configs/connectDB";

let getHomepage = async (req,res)=>{
    // const [rows, fields] = await pool.execute('SELECT * FROM tableorder');
    return  res.render('monitor.ejs'); //{dataOrder:rows}
}

let createNewOrder=async (req,res) => {    // Chuc nanng dat ban
    console.log('check req:', req.body);
    let {HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung}=req.body; // =( let HoTen= req.body.HoTen;) các biến trong let giống thuộc tính name trong các thẻ của file ejs
    await pool.execute('Insert Into tableorder (HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung) Values(?,?,?,?,?,?,?,?)',[HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung]);
    return res.redirect('/booking');
};

let searchOrder=async(req,res) => {
    // console.log('check',req.body);
    // const [rows, fields] = await pool.execute('SELECT * FROM tableorder');
    // // return  res.render('searchOrder.ejs',{dataSearch:rows});
    let {SoDienThoaiTK}=req.body;
    const [rows] = await pool.execute('SELECT ID,HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,TrangThai FROM tableorder where SoDienThoai = ?',[SoDienThoaiTK]);
    return  res.render('searchOrder.ejs',{dataSearch:rows});
}


let deleteOrder=async (req,res) => {
    let orderID=req.body.orderID;
    await pool.execute('delete from tableorder where ID = ? ',[orderID]);
    return res.redirect('/monitor');
}

let editOrder =async (req,res) => {
    let orderID=req.params.idOrder;  //idOrder = /:idOrder bên web.js
    let [Order]=await pool.execute('select * from tableorder where ID = ?',[orderID]); //orderID là biến let
    return res.render('updateOrder.ejs',{dataOrder:Order[0]});

    // return res.send(`hello user ${req.params.idOrder}`);
}

let updateOrder=async (req,res) => {
    let {HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung,ID}=req.body;
    await pool.execute('update tableorder set HoTen=?, Email=?,SoDienThoai=?,SoLuong=?,ChonViTri=?,Ngay=?,Gio=?,NoiDung=? where ID =?'
    ,[HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung,ID]);
    console.log('check',req.body);
    return res.redirect('/monitor');
}


let listOrder = async (req,res)=>{
    const [rows_homeAdmin, fields] = await pool.execute('SELECT ID,HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,TrangThai FROM tableorder where TrangThai =\'Đã Xác Nhận\'');
    return  res.render('listOrder.ejs',{dataInfo:rows_homeAdmin})
} 

let AdmindeleteOrder=async (req,res) => {
    let orderID=req.body.orderID;
    await pool.execute('delete from tableorder where ID = ? ',[orderID]);
    return res.redirect('/listOrder');
}

let AdmindeleteHanderOrder=async (req,res) => {
    let orderID=req.body.orderID;
    await pool.execute('delete from tableorder where ID = ? ',[orderID]);
    return res.redirect('/handerOrder');
}

let handerOrder = async (req,res)=>{
    const [rows_handerOrder, fields] = await pool.execute('SELECT ID,HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,TrangThai  FROM tableorder where TrangThai =\'Đang Chờ Xác Nhận\'');
    return  res.render('handerOrder.ejs',{dataHander:rows_handerOrder})
} 

let AdminUpdateOrder=async (req,res) => {
    let AdminUpdate=req.body.AdminUpdate;
    await pool.execute('update tableorder set TrangThai=\'Đã Xác Nhận\' where ID = ? ',[AdminUpdate]);
    return res.redirect('/handerOrder');
}


let hanldeLogin = async (req,res)=>{
    let {user,psw}=req.body;
    console.log("user: ",user);
    console.log("password: ",psw);
    if(user == "QuanLy" && psw == "12345")
    {
        return  res.render('infoAdmin.ejs');;
    }
    else{
        return res.redirect('/login');
    }     
} 

let menu=async (req,res) => {
    const [rows_Menu, fields] = await pool.execute('SELECT * FROM menuFood');
    return  res.render('menu.ejs',{dataMenu:rows_Menu})
}


let handleMenu=async (req,res) => {
    const [rows_handleMenu, fields] = await pool.execute('SELECT * FROM menuFood');
    return  res.render('handleMenu.ejs',{dataMenu:rows_handleMenu})
}

let adminAddMenu=async (req,res) => {    // Chuc nanng them mon an (Admin)
    console.log('check req:', req.body);
    let {Name,Cost,PNG,Detail}=req.body; // =( let HoTen= req.body.HoTen;) các biến trong let giống thuộc tính name trong các thẻ của file ejs
    await pool.execute('Insert Into menuFood (Name,Cost,PNG,Detail) Values(?,?,?,?)',[Name,Cost,PNG,Detail]);
    return res.redirect('/handleMenu');
};

let adminEditMenu =async (req,res) => {
    let IDMenu=req.params.idMenu;  //idMenu = /:idMenu bên web.js
    let [Menu]=await pool.execute('select * from menuFood where ID = ?',[IDMenu]); //idMenu là biến let
    return res.render('updateMenu.ejs',{dataMenu:Menu[0]});
}

let adminUpdateMenu=async (req,res) => {
    let {Name,Cost,PNG,Detail,ID}=req.body;
    await pool.execute('update menuFood set Name=?, Cost=?,PNG=?,Detail=? where ID =?',[Name,Cost,PNG,Detail,ID]);
    console.log('check',req.body);
    return res.redirect('/handleMenu');
}

let adminDeleteMenu=async (req,res) => {
    let menuFoodID=req.body.menuFoodID; //menuFoodID giống trong phần xóa của hanldeMenu.ejs
    await pool.execute('delete from menuFood where ID = ?',[menuFoodID]);
    return res.redirect('/handleMenu');
}

let listOrderDetail =async (req,res) => {
    let idListOrder=req.params.idListOrder;  //idListOrder = /:idMenu bên web.js
    let [ListOrder]=await pool.execute('select * from tableorder where ID = ?',[idListOrder]); //idMenu là biến let
    return res.render('listOrderDetail.ejs',{dataInfo:ListOrder[0]});
}

module.exports={
    createNewOrder,getHomepage,updateOrder,searchOrder,editOrder,deleteOrder,listOrder,handerOrder,AdmindeleteOrder,AdminUpdateOrder,hanldeLogin,
    menu,handleMenu,adminAddMenu,adminEditMenu,adminUpdateMenu,adminDeleteMenu,AdmindeleteHanderOrder,listOrderDetail
}