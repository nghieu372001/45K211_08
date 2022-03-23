import pool from "../configs/connectDB";



let createNewOrder=async (req,res) => {    // Chuc nanng dat ban
    console.log('check req:', req.body);
    let {HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung}=req.body; // =( let HoTen= req.body.HoTen;) các biến trong let giống thuộc tính name trong các thẻ của file ejs
    await pool.execute('Insert Into tableorder (HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung) Values(?,?,?,?,?,?,?,?)',[HoTen,Email,SoDienThoai,SoLuong,ChonViTri,Ngay,Gio,NoiDung]);
    return res.redirect('/booking');
};


module.exports={
    createNewOrder,
}