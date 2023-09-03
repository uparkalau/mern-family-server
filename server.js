import express from 'express';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import personRoutes from './routes/person.js';
import relationshipRoutes from './routes/relationship.js';

export const app = express();
const port = process.env.PORT || 8000;

// Configure body-parser for JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import and use the person and relationship routes
app.use('/api/people', personRoutes);
app.use('/api/relationships', relationshipRoutes);

Connection(); // Initialize the database connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
