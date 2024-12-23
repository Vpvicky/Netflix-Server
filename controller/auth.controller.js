const User = require('../model/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/token');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.send('Please Enter User Details');
    }
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Invalid username or password',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
      return res.status(400).json({
        status: false,
        message: 'Invalid username or password',
      });
    }
generateToken(user.id, res)
    res.status(200).json({
      status: true,
      user: {
       userName: user.userName,
       email: user.email,
      },
      message: 'User Login Successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: 'User Already Exist',
      });
    }
    if (!userName || !email || !password) {
      return res.send('Please Enter User Details');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    if(newUser){
      generateToken(newUser._id,res)
      await newUser.save();
      res.status(201).json({
       success: true,
       user : {
        ...newUser._doc,
        password: ""
       },
       message: 'User created successfully'
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const logout = (res)=> {
  try{
res.clearCookie('jwt-netflix')
  res.status(200).json({
    status: 'Logged Out Successfully',
  })
}catch(err){
  console.log(err);
  res.status(500).json({status: false, message: 'Server Error'})
}
}

module.exports = { login, register, logout };
