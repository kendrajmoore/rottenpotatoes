var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  title             : { type: String, required: true }
  , movieTitle            : { type: String, required: true }
  , description        : { type: String, required: true }
});

ReviewSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  next();
});


module.exports = mongoose.model('Review', ReviewSchema);
