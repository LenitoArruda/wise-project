const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProjectSchema = new Schema({
  id: ObjectId,
  name: String,
  category: Object,
  budget: Number,
  services: Array,
  cost: Number
});

const ProductModel = mongoose.model('projects', ProjectSchema);

module.exports = ProductModel