const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// const Story = require('../models/Story');

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, indexController.login);

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, indexController.dashboard);

module.exports = router;
