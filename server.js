//Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//Core
const config = require('./config');
const routes = require('./controller/routes');

//Depencies middleware
const Server = class Server {
    constructor() {
        this. app = express();
        //en gros si on lance prod bah on a la config prod, sinon il nous met sur la config dev
        this.config = config[process.argv[2]] || config.development;
    }

    dbConnect() {
        const { host } = this.config.mongodb;
        const connect = mongoose.createConnection(host);

        connect.on('error', () => {
            setTimeout(() => {
                console.log(`ERROR API DISCONNECT -> ${err}`);
                this.connect = this.dbConnect(host);
            }, 5000);
        });

        connect.on('disconnected', ()=> {
            setTimeout(() => {
                console.log(`DISCONNECTED API DISCONNECT -> ${err}`);
                this.connect = this.dbConnect(host);
            }, 5000);
        });

        process.on('SIGINT', ()=> {
            connect.close(()=> {
                console.log(`API END PROCESS API DISCONNCT -> close mongodb connect`);
                //c'est quand on l'arrête nous même
                process.exit(0);
            })
        });

        return connect;
    }

    authenticateToken(req, res, next) {
        const token = req.headers['authorization'];
        if(token == null){
            return res.sendStatus(401);
        }
        jwt.verify(token, 'Ensit3tch', (err, user)=> {
            if(err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    }

    middleware() {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    routes() {
        new routes.Evenement(this.app, this.connect, this.authenticateToken);
        new routes.Utilisateur(this.app, this.connect);

        this.app.get("/", (req, res) => {
            res.send("Homepage here.");
        });

        this.app.use((req, res) => {
            res.status(404).json({
                code: 404,
                message: 'Not found'
            });
        });
    }

    security() {
        this.app.use(helmet());
        this.app.disable('x-powered-by');
    }

    run() {
        try {
            this.connect = this.dbConnect();
            this.security();
            this.middleware();
            this.routes();
            this.app.listen(this.config.express.port);
        } catch(err) {
            console.error(` [ERROR] Server -> ${err}`);
        }
    }
};

module.exports = Server;