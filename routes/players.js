var express = require('express');
var router = express.Router();

const playersController = require('../controllers').players;

router.get('/', playersController.list);
router.get('/:id', playersController.getById);
router.post('/', playersController.add);
router.put('/:id', playersController.update);
router.delete('/:id', playersController.delete);

module.exports = router;