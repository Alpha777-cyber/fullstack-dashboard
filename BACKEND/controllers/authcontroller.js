const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User =require('../models/Usermodels');


const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const Exits = await User.findOne({email});
        if(Exits){
            return res.redirect('http://127.0.0.1:5500/FRONTEND/failedRegist.html');
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password,salt);

        const NewUser = await User.create({
            name,
            email,
            password:hashedPassword
        });

        const token = jwt.sign(
                               {id:NewUser._id},
                               process.env.JWT_SECRET,
                               {expiresIn:'1d',
                           });


        res.redirect(`http://127.0.0.1:5500/FRONTEND/dashboard.html?token=${token}`)
    }catch(err){
       return res.redirect('http://127.0.0.1:5500/FRONTEND/failedRegist.html');
    }
};

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
          return res.redirect('http://127.0.0.1:5500/FRONTEND/failedlogin.html');
        }

        const Match = await bcrypt.compare(password,user.password);
        if(!Match){
            return res.redirect('http://127.0.0.1:5500/FRONTEND/failedlogin.html');
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )


        res.redirect(`http://127.0.0.1:5500/FRONTEND/dashboard.html?token=${token}`);

    }catch(err){
        return res.redirect('http://127.0.0.1:5500/FRONTEND/failedlogin.html');
    }
};


module.exports = {registerUser,loginUser};