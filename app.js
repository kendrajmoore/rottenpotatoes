var express = require('express')
var methodOverride = require('method-override')
var app = express()
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

app.get('/', function (req, res) {
  Review.find(function(err, reviews) {
    res.render('reviews-index', {reviews: reviews});
  })
})
/
require('./controllers/reviews')(app);


// NEW
// app.get('/reviews/new', function (req, res) {
//   res.render('reviews-new', {});
// })

// SHOW
// app.get('/reviews/:id', function (req, res) {
//   Review.findById(req.params.id).exec(function (err, review) {
//     res.render('reviews-show', {review: review});
//   })
// });

// //UPDATE
// app.put('/reviews/:id', function (req, res) {
//     console.log(req.body)
//   Review.findByIdAndUpdate(req.params.id,  req.body, function(err, review) {
//     res.redirect('/reviews/' + review._id);
//   })
// })

//EDIT
// app.get('/reviews/:id/edit', function (req, res) {
//   Review.findById(req.params.id, function(err, review) {
//     res.render('reviews-edit', {review: review});
//   })
// })

// DELETE
// app.delete('/reviews/:id', function (req, res) {
//   Review.findByIdAndRemove(req.params.id, function(err) {
//     res.redirect('/');
//   })
// })

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
