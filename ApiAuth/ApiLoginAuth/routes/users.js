const express = require('express');
const router = express.Router();
const { User, Restaurant, sequelize } = require('../db');
const { register, login, getUserData, logout,checkmailotp } = require('../controller/register');
const { middleware } = require("../Middleware/middleware");

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')

router.post('/register', register);

router.post('/login', login);

router.get('/me',middleware, getUserData);
router.delete('/logout',middleware, logout);
router.post('/checkmailotp', checkmailotp);


router.post('/sendemailotp', async(req, res, ) => {
    const {email,fname,password}=req.body
    const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
     // Set expiration time to 2 minutes later
  // const expirationTime = new Date();
  // expirationTime.setMinutes(expirationTime.getMinutes() + 2);
    const emailuser = await User.findOne({ where: { email:email } });
    if (emailuser) {
        return res.send("email already exists!!!").status(400);
    }
    const salt = await bcrypt.genSalt(10);
    const adduser = new User({
        email,
        fname,
        password,
        otp:randomFourDigitNumber
    });
    adduser.password = await bcrypt.hash(password, salt);
    await adduser.save();
    const transporter = nodemailer.createTransport({ 
      service:'gmail',
      host: 'smtp.gmail.com',
      auth:{
        
        type: 'login',
        user:'huevang888@gmail.com',
        pass:'bgyd daoe mlkw gunu'
      }
    })
    const option = {
      from:'huevang888@gmail.com',
      // to:'chivang742@gmail.com',
      to:email,
      subject:'Test Nodemailer',
      body:`I like you and I so miss you`,
      html:`
      <p>Hello world I am from nodemailer</p>
      <p>Here my your OTP for register </p>
      <H1>${randomFourDigitNumber}</H1>
      <a href="https://v.ftcdn.net/06/67/53/88/240_F_667538806_MeY4qlxLlfdpA8zfHZNZnp68veq2zK2E_ST.mp4">https://facebook.com/VangHue</a>
      <img src="https://cdn11.bigcommerce.com/s-lzx6le/images/stencil/1280x1280/products/1241/2902/167398L__04164.1557610883.jpg?c=2" />
      `,
      duration:1,
    }
    transporter.sendMail(option,(err,info)=>{
      if(err){
        console.log('err',err)
        return res.status(400).json({
          RespCode:400,
          RespMessage:'bad',
          RespError:err
        })
      }
      else{
        console.log('send' + info.response)
        return res.status(200).json({
          RespCode:200,
          RespMessage:'good',
        })
      }
    })
  });

module.exports = router;
