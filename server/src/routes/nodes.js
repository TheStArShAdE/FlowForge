const express = require('express');
const router = express.Router();
const { getNodes, getNode } = require('../controllers/nodeController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getNodes);
router.get('/:type', getNode);

module.exports = router;