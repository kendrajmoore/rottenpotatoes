var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/rotten-potatoes');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))


var Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
}))


//var reviews = [
  //{ title: "Great Review" },
  //{ title: "Next Review" }
//]


//app.get('/', function (req, res) {
  //res.send('Hello World!')
//})

app.get('/', function (req, res) {
  Review.find(function(err, reviews) {
    res.render('reviews-index', {reviews: reviews});
  })
})

//app.get('/', function (req, res) {
  //res.render('home', {msg: 'Hello World!'});
//})

app.get('/', function (req, res) {
  res.render('reviews-index', {reviews: reviews});
})

// NEW
app.get('/reviews/new', function (req, res) {
  res.render('reviews-new', {});
})

app.get('/reviews/:id', function (req, res) {
  res.send('I\'m a review')
});

app.get('/reviews/:id', function (req, res) {
  Review.findById(req.params.id).exec(function (err, review) {
    res.render('reviews-show', {review: review});
  })
});

app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

app.post('/reviews', function (req, res) {
  console.log(req.body);
  res.render('reviews-new', {});
})

app.post('/reviews', function (req, res) {
  Review.create(req.body, function(err, review) {
    console.log(review);

    res.redirect('/');
  })
})

app.post('/reviews', function (req, res) {
  Review.create(req.body, function(err, review) {
    res.redirect('/reviews/' + review._id);
  })
})

// UPDATE
app.put('/reviews/:id', function (req, res) {
  Review.findAndUpdateById(req.params.id,  req.body, function(err, review) {
    res.redirect('/reviews/' + review._id);
  })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  Review.findByIdAndRemove(req.params.id, function(err) {
    res.redirect('/');
  })
})

app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
