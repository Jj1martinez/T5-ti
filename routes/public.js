var express = require('express');
var router = express.Router();

const userController = require('../controllers').userController;
var routingController = require('../controllers').routingController;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user', userController.add);

// Create session
router.post("/api/session/create", routingController.create);

module.exports = router;
