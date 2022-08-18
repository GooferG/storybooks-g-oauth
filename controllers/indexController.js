const Story = require('../models/Story');

module.exports = {
  login: (req, res) => {
    res.render('login', {
      layout: 'login',
    });
  },
  dashboard: async (req, res) => {
    // console.log(req.user);
    try {
      const stories = await Story.find({ user: req.user.id }).lean();
      res.render('dashboard', {
        name: req.user.firstName,
        image: req.user.image,
        stories,
      });
    } catch (err) {
      console.error(err);
      res.render('error/500');
    }
  },
};
