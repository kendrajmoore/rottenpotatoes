var Review = require('../models/review');

module.exports = function(app) {
  app.post('/reviews', function (req, res) {
    Review.create(req.body, function(err, review) {
      res.redirect('/reviews/' + review._id);
    })
  });


};
