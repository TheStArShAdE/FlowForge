const Flow = require('../models/Flow');
const { z } = require('zod');

const flowSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().optional(),
    nodes: z.array(z.any()).optional(),
    edges: z.array(z.any()).optional(),
});

const getFlows = async (req, res) => {
    try {
        const flows = await Flow.find({ owner: req.user.id, isActive: true })
            .select('-nodes -edges')
            .sort({ updatedAt: -1 });

        res.json({
            success: true,
            data: { flows },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const getFlow = async (req, res) => {
    try {
        const flow = await Flow.findOne({
            _id: req.params.id,
            owner: req.user.id,
            isActive: true,
        });

        if (!flow) {
            return res.status(404).json({
                success: false,
                error: 'Flow not found',
            });
        }

        res.json({
            success: true,
            data: { flow },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const createFlow = async (req, res) => {
    try {
        const { name, description } = req.body;

        const flow = await Flow.create({
            name: name || 'Untitled Flow',
            description: description || '',
            owner: req.user.id,
            nodes: [],
            edges: [],
        });

        res.status(201).json({
            success: true,
            data: { flow },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const updateFlow = async (req, res) => {
    try {
        const result = flowSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.errors.map((e) => e.message).join(', '),
            });
        }

        const flow = await Flow.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id, isActive: true },
            { ...result.data },
            { new: true }
        );

        if (!flow) {
            return res.status(404).json({
                success: false,
                error: 'Flow not found',
            });
        }

        res.json({
            success: true,
            data: { flow },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const deleteFlow = async (req, res) => {
    try {
        const flow = await Flow.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id, isActive: true },
            { isActive: false },
            { new: true }
        );

        if (!flow) {
            return res.status(404).json({
                success: false,
                error: 'Flow not found',
            });
        }

        res.json({
            success: true,
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = { getFlows, getFlow, createFlow, updateFlow, deleteFlow };