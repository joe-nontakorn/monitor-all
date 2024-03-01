//router.js
const monitorRouter = require('./monitorRouter')
const monitor2Router = require('./monitor2Router')

const BLDG1Router = require('./BLDG1Router')


exports.routes = ({ app }) => {
    app.use('/api/v1/monitor', monitorRouter);
    app.use('/api/v1/monitor2', monitor2Router);

    app.use('/api/v1/BLDG1', BLDG1Router);

};
