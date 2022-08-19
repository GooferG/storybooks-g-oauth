const Story = require('../models/Story');

module.exports = {
  addStory: (req, res) => {
    res.render('stories/add');
  },

  postStory: async (req, res) => {
    try {
      req.body.user = req.user.id;
      await Story.create(req.body);
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.render('error/500');
    }
  },

  showStories: async (req, res) => {
    try {
      const stories = await Story.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean();

      res.render('stories/index', {
        stories,
      });
    } catch (err) {
      console.error(err);
      res.render('error/500');
    }
  },

  editStory: async (req, res) => {
    try {
      const story = await Story.findOne({
        _id: req.params.id,
      }).lean();

      if (!story) {
        return res.render('error/404');
      }

      if (story.user != req.user.id) {
        res.redirect('/stories');
      } else {
        res.render('stories/edit', {
          story,
        });
      }
    } catch (err) {
      console.error(err);
      return res.render('error/500');
    }
  },

  updateStory: async (req, res) => {
    let story = await Story.findById(req.params.id).lean();
    try {
      if (!story) {
        return res.render('error/404');
      }

      if (story.user != req.user.id) {
        res.redirect('/stories');
      } else {
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        });
        res.redirect('/dashboard');
      }
    } catch (err) {
      console.error(err);
      return res.redirect('error/500');
    }
  },

  deleteStory: async (req, res) => {
    try {
      await Story.remove({ _id: req.params.id });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      return res.render('error/500');
    }
  },
};
