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

// Create a new relationship between two people
export const createRelationship = async (req, res) => {
    try {
      // Find the person by ID
      const person = await Person.findById(req.params.id);
      if (!person) {
        return res.status(404).json({ message: 'Person not found' });
      }
  
      // Create the relationship
      person.relationships.push(req.body); // Assuming you have a 'relationships' field in your Person schema
      await person.save();
  
      res.status(201).json(person);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete a relationship by ID
  export const deleteRelationship = async (req, res) => {
    try {
      // Find the person by ID
      const person = await Person.findById(req.params.id);
      if (!person) {
        return res.status(404).json({ message: 'Person not found' });
      }
  
      // Find and remove the relationship by its ID
      const relationship = person.relationships.id(req.params.relationshipId);
      if (!relationship) {
        return res.status(404).json({ message: 'Relationship not found' });
      }
  
      relationship.remove();
      await person.save();
  
      res.json({ message: 'Relationship deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Fetch relationships of a person by ID
  export const getPersonRelationships = async (req, res) => {
    try {
      // Find the person by ID and populate the 'relationships' field
      const person = await Person.findById(req.params.id).populate('relationships');
      if (!person) {
        return res.status(404).json({ message: 'Person not found' });
      }
  
      res.json(person.relationships);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get all people with their relationships
  export const getAllPeopleWithRelationships = async (req, res) => {
    try {
      // Find all people and populate the 'relationships' field
      const people = await Person.find().populate('relationships');
      res.json(people);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
    