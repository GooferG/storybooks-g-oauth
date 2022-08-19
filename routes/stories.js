const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');
const { ensureAuth } = require('../middleware/auth'); //to ensure user is logged on

// const Story = require('../models/Story');

// @desc Show Add page
// @route GET /stories/add
router.get('/add', ensureAuth, storiesController.addStory);

// @desc Process the add form
// @route POST /stories
router.post('/', ensureAuth, storiesController.postStory);

// @desc Show All Stories
// @route GET /stories
router.get('/', ensureAuth, storiesController.showStories);

// @desc Show Edit page
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, storiesController.editStory);

// @desc Update story
// @route PUT /stories/:id
router.put('/:id', ensureAuth, storiesController.updateStory);

// @desc DELETE story
// @route DELETE /stories/:id
router.delete('/:id', ensureAuth, storiesController.deleteStory);

module.exports = router;
