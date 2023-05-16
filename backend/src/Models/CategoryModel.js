const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
  id: ObjectId,
  name: String,
});

const CategoryModel = mongoose.model('categories', CategorySchema);

module.exports = CategoryModel