import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token

  console.log('Received Token:', token);  // Log token for debugging

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);  // Log verification error
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
      username: decoded.username,
      email: decoded.email
    };
    next();
  });
};

export default validateToken;
