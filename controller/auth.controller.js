const User = require("../model/user");
const bcrypt = require('bcryptjs');


 const login = async (req, res) => {
    try {
        const { email , password } = req.body;
        const user = await User.findOne({email});
        if(!email || !password){
            return res.send('Please Enter User Details')
        }
if(user){
    return res.status(400).json({
        status: 'User Already Exist'
    })
}
res.status(200).json({
    status: 'Login Successful'
})
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
};

const register =  async (req, res) => {
    try {
        const { userName, password, email} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                status: 'User Already Exist'
            })
        }
        if(!userName || !email ||!password){
            return res.send('Please Enter User Details')
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json({
            status: 'Registration Successful',
            data: newUser
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
};

module.exports = {login, register};