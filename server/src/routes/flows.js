const express = require('express');
const router = express.Router();
const {
    getFlows,
    getFlow,
    createFlow,
    updateFlow,
    deleteFlow,
} = require('../controllers/flowController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getFlows).post(createFlow);

router.route('/:id').get(getFlow).put(updateFlow).delete(deleteFlow);

module.exports = router;