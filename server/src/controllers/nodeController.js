const NodeDefinition = require('../models/NodeDefinition');

const getNodes = async (req, res) => {
    try {
        const nodes = await NodeDefinition.find({ isActive: true }).sort({
            category: 1,
            label: 1,
        });

        res.json({
            success: true,
            data: { nodes },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const getNode = async (req, res) => {
    try {
        const node = await NodeDefinition.findOne({
            type: req.params.type,
            isActive: true,
        });

        if (!node) {
            return res.status(404).json({
                success: false,
                error: 'Node type not found',
            });
        }

        res.json({
            success: true,
            data: { node },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = { getNodes, getNode };