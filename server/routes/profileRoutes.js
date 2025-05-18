const express = require('express');
const router = express.Router();
const Profile = require('../model/User');
const { fetchLeetCodeData } = require('../services/leetcode');

router.get('/leadboard', async (req, res) => {
  try {
    const profiles = await Profile.find({});

    
    const sortedProfiles = profiles.sort((a, b) => {
      const rankA = Number(a.rank);
      const rankB = Number(b.rank);
      return rankA - rankB;
    });

    res.json(sortedProfiles);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).send('Internal server error');
  }
});




router.post('/profile', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send('Username is required');
  }
  try {
    const data = await fetchLeetCodeData(username);
    if (!data) {
      return res.status(404).send('Profile not found or error fetching data');
    }

    const profile = await Profile.findOneAndUpdate(
      { username },
      data,
      { new: true, upsert: true }
    );
    res.send(profile);
  } catch (err) {
    console.error('Error in /profile:', err);
    res.status(500).send('Internal server error');
  }
}); 
router.post('/add-skill', async (req, res) => {
  try {
    const { username, skill } = req.body;

    if (!username || !skill) {
      return res.status(400).json({ error: 'Username and skill are required' });
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.skills.includes(skill)) {
      user.skills.push(skill);
      await user.save();
    }

    return res.json({ message: 'Skill added', skills: user.skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.json(profiles);
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).send('Internal server error');
  }
});

router.delete('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const deleted = await Profile.findOneAndDelete({ username });
    if (!deleted) {
      return res.status(404).send('User not found');
    }
    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Internal server error');
  }
});
router.put('/skills/:username', async (req, res) => {
  const { username } = req.params;
  const { skills } = req.body;

  

  if (!skills || !Array.isArray(skills)) {
    console.log('❌ Invalid skills format');
    return res.status(400).json({ message: 'Skills must be an array' });
  }

  try {
    const updatedUser = await Profile.findOneAndUpdate(
      { username },
      { $set: { skills } },
      { new: true }
    );

    if (!updatedUser) {
      console.log('❌ No user found for username:', username);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ Updated user:', updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error('🔥 Error caught:', error);
    res.status(500).json({
      message: 'Error updating skills',
      error: error.message || 'Unknown error',
      name: error.name,
      stack: error.stack,
    });
  }
});
router.put('/college/:username', async (req, res) => {
  try {
    const { college, year, department } = req.body;  // extract all three

    const updatedUser = await Profile.findOneAndUpdate(
      { username: req.params.username },
      { college, department, year },  // now all defined
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;

    
    let profile = await Profile.findOne({ username });

    
    if (!profile) {
      const data = await fetchLeetCodeData(username);
      if (!data) {
        return res.status(404).send('Profile not found on LeetCode');
      }

      profile = await Profile.findOneAndUpdate(
        { username },
        data,
        { new: true, upsert: true }
      );
    }

    res.json(profile);

  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
