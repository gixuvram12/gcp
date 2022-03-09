const express = require('express');
const gcpController = require('./gcp-controller');
const { quoteSchema, 
        getActorSchema, 
        addQuoteSchema
      }  = require('../../middleware/schema-validator/gcp-shema-validator');

const gcpRouter = express.Router();

    gcpRouter.get('/get_films', gcpController.getFilms);
    gcpRouter.get('/get_quotes',quoteSchema, gcpController.getQuotes);
    gcpRouter.get('/get_actor',getActorSchema, gcpController.getActor);
    gcpRouter.post('/add_quote',addQuoteSchema, gcpController.addQuote);
    gcpRouter.get('/translate', gcpController.translateQuote);

    module.exports = gcpRouter;
    