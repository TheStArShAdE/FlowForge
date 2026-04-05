const mongoose = require('mongoose');

const portSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['string', 'number', 'boolean', 'object', 'array', 'any'],
            default: 'any',
        },
        required: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            default: '',
        },
    },
    { _id: false }
);

const nodeDefinitionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            unique: true,
        },
        label: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: [
                'trigger',
                'llm',
                'tool',
                'logic',
                'output',
                'transform',
                'memory',
            ],
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        inputs: [portSchema],
        outputs: [portSchema],
        configSchema: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        isBuiltIn: {
            type: Boolean,
            default: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('NodeDefinition', nodeDefinitionSchema);