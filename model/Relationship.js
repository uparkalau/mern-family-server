import { Schema, model } from 'mongoose';

const relationshipSchema = new Schema({
  personA: {
    type: Schema.Types.ObjectId,
    ref: 'Person', // Reference to the Person model
    required: true,
  },
  personB: {
    type: Schema.Types.ObjectId,
    ref: 'Person', // Reference to the Person model
    required: true,
  },
  relationshipType: {
    type: String,
    required: true,
  },
});
const Relationship = model('Relationship', relationshipSchema);

export default Relationship;
