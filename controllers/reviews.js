var Review = require('../models/review');

module.exports = function(app) {

  app.get('/reviews/new', function (req, res) {
    res.render('reviews-new', {});
  })

  app.post('/reviews', function (req, res) {
    Review.create(req.body, function(err, review) {
      res.redirect('/reviews/' + review._id);
    })
  })
  app.get('/reviews/:id', function (req, res) {
    Review.findById(req.params.id).exec(function (err, review) {
      res.render('reviews-show', {review: review});
    })
  })
  //UPDATE
  app.put('/reviews/:id', function (req, res) {
      console.log(req.body)
    Review.findByIdAndUpdate(req.params.id,  req.body, function(err, review) {
      res.redirect('/reviews/' + review._id);
    })
  })
  app.get('/reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review});
    })
  })
  app.delete('/reviews/:id', function (req, res) {
    Review.findByIdAndRemove(req.params.id, function(err) {
      res.redirect('/');
    })
  })


};
