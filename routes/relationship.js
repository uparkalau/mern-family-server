import express from 'express';

const router = express.Router();

import { createRelationship, deleteRelationship } from '../controller/relationship-controller.js';

router.post('/', createRelationship);

router.delete('/:id', deleteRelationship);

export default router;
