const express = require('express');
const tasks = require('../controllers/taskController');
const requireLogin = require('../middlewares/requireLogin');

const router = express.Router();

router.use(requireLogin);

router.get('/', tasks.getTasks);
router.post('/', tasks.createTask);
router.put('/:id', tasks.updateTask);
router.delete('/:id', tasks.deleteTask);

module.exports = router;