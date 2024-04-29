import express from 'express';
import * as UserController from '../controller/UserController.js'

const router = express.Router();

router.get('/', UserController.getAllUsers);


router.get('/:id', UserController.getUserByID);


router.post('/', UserController.createUser);


router.post('/login', UserController.login);



export default router;