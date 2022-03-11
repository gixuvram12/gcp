const getResponse = require('../../lib/responses/get-response');
const getErrorResponse = require('../../lib/responses/get-error-response');
const { DATA_SAVED, GCP, TRANSLATION, MSG_RECEIVED } = require('../../constants/constant-keys');

//PUB-SUB
const { PubSub } = require("@google-cloud/pubsub");
const pubsubRepository = require("../../pub-sub-repo/pub-sub-repo");
const { publishMessage } = pubsubRepository;
const pubSubClient = new PubSub();
const topicName = "projects/gcp-pub/topics/translation-worker";
const subscriptionName = "projects/gcp-pub/subscriptions/translation-worker-sub";
const timeout = 60;

//Firestore
const { Firestore } = require('@google-cloud/firestore');

// Create a new client
const firestore = new Firestore();

    const getFilms = async function(request, response) {

        const filmList = [];

      //Collecting all film list
        firestore.collection(GCP).get()
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

        const {film_title, language} = request.query;

      //fetching movie quotes attributed to the film
      firestore
        .collection(GCP)
        .doc(film_title)
        .get()
        .then((data) => { 
          const res = data.data().desc;

          const filteredData = res.filter(el => {
            return delete el['actor'];
          })

          const languagePref = filteredData.filter(el => {
            if (language === "en"){
            return delete el.quote['fr'];
            } else{
              return delete el.quote['en'];
            }
          })

          response.status(200).json(getResponse('gcp_controller', languagePref));
        })
        .catch(error => {
          response.status(500).json(getErrorResponse('catch_error', error));
        });

    }

    const getActor = async function(request, response) {

      const {film_name, quote, language} = request.query;
      const getActorData = [];

      //fetching actor name attributed to the quote
      firestore
        .collection(GCP)
        .doc(film_name)
        .get()
        .then((data) => { 
          const responseData = data.data()['desc'];

        Object.keys(responseData).forEach(function(key) {
          var value = responseData[key];
          if (language === "en" && value.quote.en === quote){
            delete value.quote['fr'];
            getActorData.push(value)
          } else if (language === "fr" && value.quote.fr === quote){
            delete value.quote['en'];
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

    const reqData = request.body;

    //publishing messages to topic
    publishMessage(pubSubClient, topicName, reqData)
    .then(async()=> {

    //adding actor and quote attributed to the film
    const quoteLang = {actor: reqData.actor,
      quote: { en: reqData.quote
     }};

    return firestore.collection(GCP).doc(reqData.film_name).update({
      desc: Firestore.FieldValue.arrayUnion(quoteLang)
    },{merge:true})
    .then(() => { 
      response.status(200).json(getResponse('gcp_controller', DATA_SAVED));
    })
    .catch(error => {
      response.status(500).json(getErrorResponse('catch_error', error));
    });
    
    })

}

  const translateQuote = async function(request, response) {

    const desc = [], translationText = {
        "license": {
        "translations": [{
        "detectedSourceLanguage": "en",
        "translatedText": "Dis bonjour à mon petit ami."
      }]
    }};

    //subscribing to the topic and retrieve message from topic
    const subscription = pubSubClient.subscription(subscriptionName);
    let messageCount = 0;
    const messageHandler = message => {
       
      //converting message from buffer to json
      var actualData = Buffer.from(`${message.data}`);
      var convertedData = actualData.toString();
      var jsonData = JSON.parse(convertedData);

      firestore
        .collection(GCP)
        .doc(jsonData.film_name)
        .get()
        .then((data) => { 
        
        const responseData = data.data()['desc'];
      
        for(data of responseData){
          if (data.actor === jsonData.actor){
            data.quote.fr = TRANSLATION
          }
          desc.push(data);
        }

      //storing quote into firestore after translation  
      firestore
        .collection(GCP)
        .doc(jsonData.film_name).set({
          desc
        })
        .then(()=> {
          response.status(200).json(getResponse('gcp_controller', translationText));
        })
        .catch(error => {
          response.status(500).json(getErrorResponse('catch_error', error));
        });
        })
          messageCount += 1;
          message.ack();
      }

      subscription.on('message', messageHandler);
      setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount}`, MSG_RECEIVED);
      }, timeout * 1000);

  }

module.exports = { getFilms, getQuotes, getActor, addQuote, translateQuote };
