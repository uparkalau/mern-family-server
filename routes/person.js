import express from 'express';
import {
  createPerson,
  getAllPeopleWithRelationships,
  getPersonById,
  updatePerson,
  deletePerson,
  createRelationship,
  deleteRelationship,
  getPersonRelationships,
} from '../controller/person-controller.js';

const router = express.Router();

// Create a new person
router.post('/new', createPerson);

// Get all persons with their relationships
router.get('/', getAllPeopleWithRelationships);

// Get a specific person by ID
router.get('/:id', getPersonById);

// Update a person by ID
router.put('/:id', updatePerson);

// Delete a person by ID
router.delete('/:id', deletePerson);

// Create a new relationship between two people
router.post('/:id/relationships', createRelationship);

// Delete a relationship by ID
router.delete('/:id/relationships/:relationshipId', deleteRelationship);

// Fetch relationships of a person by ID
router.get('/:id/relationships', getPersonRelationships);

export default router;
