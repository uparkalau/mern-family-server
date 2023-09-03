import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../server.js'; // Import the app instance
import Person from '../../model/Person.js';
import Relationship from '../../model/Relationship.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Relationship Controller', () => {
  // Create two test persons for relationship testing
  let personA;
  let personB;

  before(async () => {
    // Create two test persons before running the tests
    personA = await Person.create({
      name: 'Person A',
      age: 30,
    });

    personB = await Person.create({
      name: 'Person B',
      age: 25,
    });
  });

  // after(async () => {
  //   // Clean up by deleting the test persons and the test relationship after running the tests
  //   await Person.deleteMany({ _id: { $in: [personA._id, personB._id] } });

  //   // Check if testRelationship is defined before attempting to delete it
  //   if (testRelationship) {
  //     await Relationship.deleteOne({ _id: testRelationship._id });
  //   }
  // });

  // Example relationship data for testing
  const testRelationshipData = {
    personA: personA._id, // Use the ID of personA
    personB: personB._id, // Use the ID of personB
    relationshipType: 'Spouse',
  };

  let testRelationship;

  it('should create a new relationship', (done) => {
    chai.request(app)
      .post('/api/relationships')
      .send(testRelationshipData) // Use the test relationship data
      .end(async (err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');

        // Check that the relationship has been created in the database
        testRelationship = await Relationship.findById(res.body._id);
        expect(testRelationship).to.exist;

        done();
      });
  });

  // it('should delete a relationship by ID', (done) => {
  //   // Check if testRelationship is defined before attempting to delete it
  //   if (!testRelationship) {
  //     return done(new Error('Test relationship is undefined.'));
  //   }
  
  //   chai.request(app)
  //     .delete(`/api/relationships/${testRelationship._id}`)
  //     .end(async (err, res) => {
  //       expect(res).to.have.status(200);
  
  //       // Check that the relationship has been deleted from the database
  //       const deletedRelationship = await Relationship.findById(testRelationship._id);
  //       expect(deletedRelationship).to.be.null;
  
  //       done();
  //     });
  // });
  
});
