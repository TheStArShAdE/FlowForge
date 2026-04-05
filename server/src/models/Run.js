const mongoose = require('mongoose');

const nodeLogSchema = new mongoose.Schema(
    {
        nodeId: {
            type: String,
            required: true,
        },
        nodeType: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'running', 'completed', 'failed'],
            default: 'pending',
        },
        input: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        output: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        error: {
            type: String,
            default: null,
        },
        startedAt: {
            type: Date,
            default: null,
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    { _id: false }
);

const runSchema = new mongoose.Schema(
    {
        flow: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flow',
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'running', 'completed', 'failed'],
            default: 'pending',
        },
        trigger: {
            type: String,
            enum: ['manual', 'webhook', 'schedule', 'api'],
            default: 'manual',
        },
        input: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        output: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        nodeLogs: [nodeLogSchema],
        startedAt: {
            type: Date,
            default: null,
        },
        completedAt: {
            type: Date,
            default: null,
        },
        error: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Run', runSchema);