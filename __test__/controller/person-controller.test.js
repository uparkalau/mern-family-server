import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../server.js'; // Import the app instance
import Person from '../../model/Person.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Person Controller', () => {
  // Create a new person for testing
  let testPerson;

  before(async () => {
    // Create a test person before running the tests
    testPerson = await Person.create({
      name: 'Test Person',
      age: 25,
      // Other properties as needed
    });
  });

  after(async () => {
    // Clean up by deleting the test person after running the tests
    await Person.deleteOne({ _id: testPerson._id });
  });

  it('should get all people', (done) => {
    chai.request(app)
      .get('/api/people')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new person', (done) => {
    chai.request(app)
      .post('/api/people')
      .send({ name: 'New Person', age: 30 }) 
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get a specific person by ID', (done) => {
    chai.request(app)
      .get(`/api/people/${testPerson._id}`) // Use the ID of the test person
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Test Person');
        done();
      });
  });

  it('should update a person by ID', (done) => {
    chai.request(app)
      .put(`/api/people/${testPerson._id}`)
      .send({ name: 'Updated Person' }) // Update the name
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Updated Person');
        done();
      });
  });

  it('should delete a person by ID', (done) => {
    chai.request(app)
      .delete(`/api/people/${testPerson._id}`) // Use the ID of the test person
      .end(async (err, res) => {
        expect(res).to.have.status(200);
        // Verify that the person has been deleted
        const deletedPerson = await Person.findById(testPerson._id);
        expect(deletedPerson).to.be.null;
        done();
      });
  });
});
