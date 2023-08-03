import mongoose from "mongoose"
import {v4 as uuidv4} from "uuid"

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    unique: true
  }
});

restaurantSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next(); // Skip setting the UUID during updates
  }

  this.uuid = uuidv4(); // Set the UUID for new documents
  next();
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
