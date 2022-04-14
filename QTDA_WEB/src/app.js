import express from "express";
import configViewEngine from "./configs/viewEngine"; //Kết nối đên src/assets để dùng file css
import initWebRoute from "./route/web";


require('dotenv').config(); // sử dụng env

const app=express();
const port=process.env.PORT || 3000;


//Gửi data từ client lên server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up view engine
configViewEngine(app); // dùng css

// set up view engine
initWebRoute(app);


app.use(express.static('assets')); // Need

app.get('/home', (req,res)=>{
    res.sendFile(__dirname+ '/index.html');
})

// app.get('/menu', (req,res)=>{
//     res.sendFile(__dirname+ '/menu.html');
// })

// app.get('/Admin', (req,res)=>{
//     res.sendFile(__dirname+ '/homeAdmin.html');
// })

app.get('/loginTest', (req,res)=>{
    res.sendFile(__dirname+ '/login.html');
})

app.listen(port,()=> console.info(`Listening on port http://localhost:${port}/home`));