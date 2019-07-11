var express = require('express');
var router = express.Router();

const gamesController = require('../controllers').games;

router.get('/', gamesController.list);
router.get('/:id', gamesController.getById);
router.post('/', gamesController.add);
router.put('/:id', gamesController.update);
router.delete('/:id', gamesController.delete);

module.exports = router;