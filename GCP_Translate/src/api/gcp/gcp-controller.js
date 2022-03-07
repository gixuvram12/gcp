const admin = require('firebase-admin');
const getResponse = require('../../lib/responses/get-response');
const getErrorResponse = require('../../lib/responses/get-error-response');
const { DATA_SAVED, GCP } = require('../../constants/constant-keys');

    const getFilms = async function(request, response) {

        const filmList = [];

      //Collecting all film list
        admin.firestore().collection(GCP).get()
        .then(data => {
          data.docs.forEach(doc => {
            filmList.push(doc.id);
        });
        response.status(200).json(getResponse('gcp_controller', filmList))
        })
        .catch(error => {
          response.status(500).json(getErrorResponse('catch_error', error));
        });

    }


    const getQuotes = async function(request, response) {

        const film_title = request.query.film_title;

        //fetching movie quotes attributed to the film
        admin
        .firestore()
        .collection(GCP)
        .doc(film_title)
        .get()
        .then((data) => { 
          const res = data.data().desc;
          const filteredData = res.filter(el => {
            return delete el['actor'];
          })
          response.status(200).json(getResponse('gcp_controller', filteredData));
        })
        .catch(error => {
          response.status(500).json(getErrorResponse('catch_error', error));
        });

    }

    const getActor = async function(request, response) {

      const {film_name, quote} = request.query;
      const getActorData = [];
      //fetching actor name attributed to the quote
      admin
      .firestore()
      .collection(GCP)
      .doc(film_name)
      .get()
      .then((data) => { 
        const responseData = data.data()['desc'];

        Object.keys(responseData).forEach(function(key) {
          var value = responseData[key];
          if(value.quote === quote){
            getActorData.push(value)
          }
      });
        response.status(200).json(getResponse('gcp_controller', getActorData))
      })
      .catch(error => {
        response.status(500).json(getErrorResponse('catch_error', error));
      });

  }

  const addQuote = async function(request, response) {

    const db = admin.firestore(); 
    const collection = db.collection(GCP);
    const {actor, quote, film_name} = request.body;

    //adding actor and quote attributed to the quote
    collection.doc(film_name).update({
      desc: admin.firestore.FieldValue.arrayUnion(
        {actor: actor,
         quote: quote})
    },{merge:true})
    .then(() => { 
      response.status(200).json(getResponse('gcp_controller', DATA_SAVED));
    })
    .catch(error => {
      response.status(500).json(getErrorResponse('catch_error', error));
    });

}

module.exports = { getFilms, getQuotes, getActor, addQuote };
