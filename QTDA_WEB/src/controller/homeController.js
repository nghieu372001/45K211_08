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
    const [rows] = await pool.execute('SELECT * FROM tableorder where SoDienThoai = ?',[SoDienThoaiTK]);
    return  res.render('searchOrder.ejs',{dataSearch:rows});

}


let deleteOrder=async (req,res) => {
    let orderID=req.body.orderID;
    await pool.execute('delete from tableorder where ID = ? ',[orderID]);
    return res.redirect('/monitor');
}

let editOrder =async (req,res) => {
    let orderID=req.params.idOrder;  //idOrder = /:idOrder bên web
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


let homeAdmin = async (req,res)=>{
    const [rows_homeAdmin, fields] = await pool.execute('SELECT * FROM tableorder where TrangThai =\'Đã Xác Nhận\'');
    return  res.render('homeAdmin.ejs',{dataInfo:rows_homeAdmin})
} 

let AdmindeleteOrder=async (req,res) => {
    let orderID=req.body.orderID;
    await pool.execute('delete from tableorder where ID = ? ',[orderID]);
    return res.redirect('/handerOrder');
}

let handerOrder = async (req,res)=>{
    const [rows_handerOrder, fields] = await pool.execute('SELECT * FROM tableorder where TrangThai =\'Đang Chờ Xác Nhận\'');
    return  res.render('handerOrder.ejs',{dataHander:rows_handerOrder})
} 

let AdminUpdateOrder=async (req,res) => {
    let AdminUpdate=req.body.AdminUpdate;
    await pool.execute('update tableorder set TrangThai=\'Đã Xác Nhận\' where ID = ? ',[AdminUpdate]);
    return res.redirect('/handerOrder');
}

module.exports={
    createNewOrder,getHomepage,updateOrder,searchOrder,editOrder,deleteOrder,homeAdmin,handerOrder,AdmindeleteOrder,AdminUpdateOrder
}