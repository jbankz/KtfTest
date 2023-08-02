import Joi from 'joi';

const validator = (schema: Joi.Schema) => (payload: any) => schema.validate(payload, { abortEarly: false });

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'website'] } }).required(),
    category: Joi.string().required(),
    message: Joi.string().required(),
    phone: Joi.string().required()
});

export const validateUserSchema = validator(userSchema);
