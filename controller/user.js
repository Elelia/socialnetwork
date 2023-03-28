const UserModel = require('../model/user');

const User = class User {
    constructor(app, connect, auth) {
        this.app = app;
        this.connect = connect;
        this.auth = auth;

        this.UserModel = connect.model('User', UserModel);

        this.run();
    }

    create() {
        this.app.post('/utilisateur', (req, res) => {
            try {
                const userModel = new this.UserModel(req.body);
                userModel.save().then((message) => {
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
            console.error(`[ERROR] Controller utilisateur -> ${err}`);
        }
    }
}

module.exports = User;