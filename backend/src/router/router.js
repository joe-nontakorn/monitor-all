//router.js
const pingRouter = require('./pingRouter');
const ping2Router = require('./ping2Router')

exports.routes = ({ app }) => {
    app.use('/api/ping/check-cctv', pingRouter);
    app.use('/api/ping/check-cctv2', ping2Router);


};
