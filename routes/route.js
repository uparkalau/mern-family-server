import express, { Router } from 'express';


import { addUser, getUsersList, toggleUserDone, updateUser, deleteUser } from '../controller/users-controller.js';

const route = express.Router();


route.post('/users', addUser)
route.get('/users', getUsersList);
route.get('/users/:id', toggleUserDone);
route.put('/users/:id', updateUser);
route.delete('/users/:id', deleteUser);


export default route;