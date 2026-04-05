const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        position: {
            x: {
                type: Number,
                required: true,
            },
            y: {
                type: Number,
                required: true,
            },
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { _id: false }
);

const edgeSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        sourceHandle: {
            type: String,
            default: {},
        },
        targetHandle: {
            type: String,
            default: {},
        },
    },
    { _id: false }
);

const flowSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            default: 'Untitled Flow',
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        nodes: [nodeSchema],
        edges: [edgeSchema],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Flow', flowSchema);