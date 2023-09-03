import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  parents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  grandparents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  partners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
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
  const currentPerson = this;

  // Initialize the path as null
  currentPerson.path = null;

  // Helper function to recursively build the path
  async function buildPath(person) {
    if (person.parents && person.parents.length > 0) {
      const parentPromises = person.parents.map(async (parentId) => {
        const parent = await mongoose.model('Person').findById(parentId);
        await buildPath(parent);
      });
      await Promise.all(parentPromises);
      currentPerson.path = (currentPerson.path || '') + person._id + ',';
    } else {
      currentPerson.path = ',' + currentPerson._id + ',';
    }
  }

  await buildPath(currentPerson);

  next();
});

const Person = mongoose.model('Person', personSchema);

export default Person;
