const Joi = require('joi');

module.exports = {
    validate: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if (result.error)
                return res.status(400).json(result.error);

            if (!req.value)
                req.value = {};

            req.value['body'] = result.value;
            next();
        }

    }
    ,
    schemas: {
        auth: Joi.object().keys({
            name: Joi.string().optional(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}