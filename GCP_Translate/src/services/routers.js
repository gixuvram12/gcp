const gcpRouter = require('../api/gcp/gcp-router');

//routing
module.exports = (app) => {
        app.use('/', gcpRouter)
}