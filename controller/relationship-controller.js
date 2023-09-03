import Relationship from '../model/Relationship.js';

// Create a new relationship between two people
export const createRelationship = async (req, res) => {
  try {
    const relationship = new Relationship(req.body);
    await relationship.save();
    res.status(201).json(relationship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a relationship between two people by ID
export const deleteRelationship = async (req, res) => {
  try {
    const relationship = await Relationship.findByIdAndDelete(req.params.id);
    if (!relationship) {
      return res.status(404).json({ message: 'Relationship not found' });
    }
    res.json({ message: 'Relationship deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
