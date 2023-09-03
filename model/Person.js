import { Schema, model } from 'mongoose';

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  grandparents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  partners: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  path: {
    type: String,
    default: null,
  },
});

// Add a pre-save hook to update the "path" field
personSchema.pre('save', async function (next) {
  const person = this;

  // Initialize the path as null
  person.path = null;

  // Helper function to recursively build the path
  async function buildPath(currentPerson) {
    if (currentPerson.parents && currentPerson.parents.length > 0) {
      const parentPromises = currentPerson.parents.map(async (parentId) => {
        const parent = await model('Person').findById(parentId);
        await buildPath(parent);
      });
      await Promise.all(parentPromises);
      person.path = (person.path || '') + currentPerson._id + ',';
    } else {
      person.path = ',' + person._id + ',';
    }
  }

  await buildPath(person);

  next();
});

const Person = model('Person', personSchema);

export default Person;