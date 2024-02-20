//router.js
const monitorRouter = require('./monitorRouter')

exports.routes = ({ app }) => {
    app.use('/api/v1/monitor', monitorRouter);



};
