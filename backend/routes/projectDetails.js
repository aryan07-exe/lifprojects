// Fetch all projects

const express = require('express');
const router = express.Router();
const ProjectDetails = require('../models/ProjectDetails');
router.get('/all', async (req, res) => {
  try {
    const projects = await ProjectDetails.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});
 

// Create new project
router.post('/', async (req, res) => {
  try {
    const project = new ProjectDetails(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  const projects = await ProjectDetails.find();
  res.json(projects);
});

module.exports = router;
