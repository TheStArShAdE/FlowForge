const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: error.errors.map((e) => e.message).join(', '),
            });
        }
        next(error);
    }
};

module.exports = { validate };