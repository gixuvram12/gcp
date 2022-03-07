const gcpRouter = require('../api/gcp/gcp-router');

module.exports = (app) => {
        app.use('/', gcpRouter)
}