import Person from '../model/Person.js';

// Create a new person
export const createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all people
export const getAllPeopleWithRelationships = async (req, res) => {
  try {
    const people = await Person.find().populate([
      'parents',
      'grandparents',
      'partners',
      'children',
      'friends',
    ]);
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific person by ID
export const getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a person by ID
export const updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a person by ID
export const deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch relationships of a person
export const getPersonRelationships = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id).populate([
      'parents',
      'grandparents',
      'partners',
      'children',
      'friends',
    ]);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
