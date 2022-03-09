const Joi = require('joi');
const {
    nameSchema
} = require('../../lib/joi-validations');
const getMiddlewareResponse = require('../../lib/responses/get-middleware-response');

const quoteSchema = async (request, response, next) => {
    const quoteSchema = Joi.object().keys({
        film_title: nameSchema.required(),
        language: nameSchema.required()
    });
    const joiResponse = quoteSchema.validate(request.query);
    return !joiResponse.error ? next() : response.status(400).json(getMiddlewareResponse('joi_validation', joiResponse.error.details[0]));
}

const getActorSchema = async (request, response, next) => {
    const getActorSchema = Joi.object().keys({
        quote: nameSchema.required(),
        film_name: nameSchema.required(),
        language: nameSchema.required()
    });
    const joiResponse = getActorSchema.validate(request.query);
    return !joiResponse.error ? next() : response.status(400).json(getMiddlewareResponse('joi_validation', joiResponse.error.details[0]));
}

const addQuoteSchema = async (request, response, next) => {
    const addQuoteSchema = Joi.object().keys({
        actor: nameSchema.required(),
        quote: nameSchema.required(),
        film_name: nameSchema.required()
    });
    const joiResponse = addQuoteSchema.validate(request.body);
    return !joiResponse.error ? next() : response.status(400).json(getMiddlewareResponse('joi_validation', joiResponse.error.details[0]));
}

module.exports = {quoteSchema, getActorSchema, addQuoteSchema}
