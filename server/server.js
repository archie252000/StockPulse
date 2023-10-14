const http = require('http');
const app = require('./app');
const db = require("./models");

const { setAlerts } = require('./utils/setAlerts');

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

db.sequelize.sync().then((req) => {
    server.listen(port, () => {
        setAlerts();
        console.log(`Server is running on port ${port}`);
    })
});


server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        `Pipe ${port}` :
        `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        `pipe ${addr}` :
        `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
});