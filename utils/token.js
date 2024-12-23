const jwt = require('jsonwebtoken');

const generateToken = async ({ userId, res }) => {
  const secret = 'My_Web_Secret#ygwfey';
  const token = jwt.sign({ userId }, secret, { expiresIn: '15d' });

  res.cookie('jwt-netflix', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Protect against XSS attacks,
    sameSite: 'strict', // Prevent CSRF attacks
  });

  return token;
};

module.exports = generateToken;