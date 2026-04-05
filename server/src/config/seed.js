const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NodeDefinition = require('../models/NodeDefinition');

dotenv.config();

const nodeDefinitions = [
    {
        type: 'manual-trigger',
        label: 'Manual Trigger',
        category: 'trigger',
        description: 'Manually trigger a flow with an optional text input',
        inputs: [],
        outputs: [
            {
                name: 'output',
                type: 'string',
                required: false,
                description: 'Initial input text provided by the user',
            },
        ],
        configSchema: {
            inputText: { type: 'string', label: 'Input Text', default: '' },
        },
        isBuiltIn: true,
    },
    {
        type: 'llm',
        label: 'LLM',
        category: 'llm',
        description: 'Send a prompt to a language model and get a response',
        inputs: [
            {
                name: 'input',
                type: 'string',
                required: true,
                description: 'The prompt or input text',
            },
        ],
        outputs: [
            {
                name: 'output',
                type: 'string',
                required: false,
                description: 'The model response',
            },
        ],
        configSchema: {
            provider: {
                type: 'string',
                label: 'Provider',
                enum: ['openai', 'anthropic', 'google', 'groq'],
                default: 'openai',
            },
            model: { type: 'string', label: 'Model', default: 'gpt-4o' },
            systemPrompt: {
                type: 'string',
                label: 'System Prompt',
                default: 'You are a helpful assistant.',
            },
            temperature: {
                type: 'number',
                label: 'Temperature',
                default: 0.7,
            },
            maxTokens: {
                type: 'number',
                label: 'Max Tokens',
                default: 1000,
            },
        },
        isBuiltIn: true,
    },
    {
        type: 'text-output',
        label: 'Text Output',
        category: 'output',
        description: 'Display the final text output of the flow',
        inputs: [
            {
                name: 'input',
                type: 'string',
                required: true,
                description: 'Text to display as output',
            },
        ],
        outputs: [],
        configSchema: {},
        isBuiltIn: true,
    },
    {
        type: 'http-request',
        label: 'HTTP Request',
        category: 'tool',
        description: 'Make an HTTP request to any URL',
        inputs: [
            {
                name: 'input',
                type: 'object',
                required: false,
                description: 'Dynamic values to inject into the request',
            },
        ],
        outputs: [
            {
                name: 'output',
                type: 'object',
                required: false,
                description: 'Response data',
            },
        ],
        configSchema: {
            method: {
                type: 'string',
                label: 'Method',
                enum: ['GET', 'POST', 'PUT', 'DELETE'],
                default: 'GET',
            },
            url: { type: 'string', label: 'URL', default: '' },
            headers: { type: 'object', label: 'Headers', default: {} },
            body: { type: 'object', label: 'Body', default: {} },
        },
        isBuiltIn: true,
    },
    {
        type: 'condition',
        label: 'Condition',
        category: 'logic',
        description: 'Branch the flow based on a condition',
        inputs: [
            {
                name: 'input',
                type: 'any',
                required: true,
                description: 'Value to evaluate',
            },
        ],
        outputs: [
            {
                name: 'true',
                type: 'any',
                required: false,
                description: 'Output if condition is true',
            },
            {
                name: 'false',
                type: 'any',
                required: false,
                description: 'Output if condition is false',
            },
        ],
        configSchema: {
            operator: {
                type: 'string',
                label: 'Operator',
                enum: ['equals', 'contains', 'greater_than', 'less_than'],
                default: 'equals',
            },
            value: { type: 'string', label: 'Compare Value', default: '' },
        },
        isBuiltIn: true,
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        await NodeDefinition.deleteMany({ isBuiltIn: true });
        await NodeDefinition.insertMany(nodeDefinitions);

        console.log(`Seeded ${nodeDefinitions.length} node definitions`);
        process.exit(0);
    } catch (error) {
        console.error(`Seed error: ${error.message}`);
        process.exit(1);
    }
};

seed();