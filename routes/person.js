import express from 'express';

const router = express.Router();

import { createPerson, getAllPeopleWithRelationships, getPersonById, updatePerson, deletePerson } from '../controller/person-controller.js';

// Create a new person
router.post('/', createPerson);

// Get all persons
router.get('/', getAllPeopleWithRelationships);

// Get a specific person by ID
router.get('/:id', getPersonById);

// Update a person by ID
router.put('/:id', updatePerson);

// Delete a person by ID
router.delete('/:id', deletePerson);

export default router;
