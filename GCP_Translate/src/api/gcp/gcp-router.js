const express = require('express');
const gcpController = require('./gcp-controller');
const { quoteSchema, getActorSchema, addQuoteSchema }  = require('../../middleware/schema-validator/auth-shema-validator');

const userRouter = express.Router();

    userRouter.get('/gcp', gcpController.getFilms);
    userRouter.get('/get_quotes',quoteSchema, gcpController.getQuotes);
    userRouter.get('/get_actor',getActorSchema, gcpController.getActor);
    userRouter.post('/add_quote',addQuoteSchema, gcpController.addQuote);

    module.exports = userRouter;

