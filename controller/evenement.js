const EvenementModel = require('../model/evenement');

const Evenement = class Evenement {
    constructor(app, connect, auth) {
        this.app = app;
        this.connect = connect;
        this.auth = auth;

        this.EvenementModel = connect.model('Evenement', EvenementModel);

        this.run();
    }

    create() {
        this.app.post('/evenement', (req, res) => {
            try {
                const messageModel = new this.EvenementModel(req.body);
                messageModel.save().then((message) => {
                    res.status(200).json(message || {});
                }).catch(() =>{
                    res.status(200).json({});
                });
            } catch(err){
                console.error(`ERROR Post -> evenement ${err}`)
                res.status(400).json({
                    code: 400,
                    message: 'Bad request'
                });
            }
        });
    }

    show() {
        
    }

    update() {
        
    }

    delete() {
        
    }

    run() {
        try {
            this.create();
            this.show();
            this.update();
            this.delete();
        } catch(err) {
            console.error(`[ERROR] Controller evenement -> ${err}`);
        }
    }
}

module.exports = Evenement;