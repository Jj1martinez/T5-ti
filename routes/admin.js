var express = require('express');
var router = express.Router();

const userController = require('../controllers').userController;


/* User Router */
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);


module.exports = router;