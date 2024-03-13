//router.js
const monitorRouter = require('./monitorRouter')
const monitor2Router = require('./monitor2Router')

const BLDG1Router = require('./BLDG1Router')

const HYIRouter = require('./HYIRouter')
const temp30 = require('./temp30Router')


exports.routes = ({ app }) => {
    app.use('/api/v1/monitor', monitorRouter);
    app.use('/api/v1/monitor2', monitor2Router);
    app.use('/api/v1/HYI', HYIRouter);

    app.use('/api/v1/BLDG1', BLDG1Router);

    app.use('/api/v1/temp30', temp30);

};
