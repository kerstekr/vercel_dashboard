const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthUser = require('../model/AuthUser');

const router = express.Router();
const JWT_SECRET = 'my_secret_key'; 


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
 
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  
  if (username !== 'admin') {
    return res.status(403).json({ message: 'Only admin may log in' });
  }

  try {
   
    const user = await AuthUser.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  try {
    if (await AuthUser.findOne({ username })) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new AuthUser({ username, passwordHash, role: role || 'user' });
    await user.save();

    res.status(201).json({ message: 'User registered', username, role: user.role });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
