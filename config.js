const CONFIG = {
    development: {
        type: "development",
        express: {
            port: 3020
        },
        mongodb: {
            host: 'mongodb+srv://root:root@cluster0.d5kzac4.mongodb.net/socialnetwork?retryWrites=true&w=majority'
        }
    },
    production: {
        type: "production",
        express: {
            port: 3020
        },
        mongodb: {
            host: 'mongodb+srv://root:root@cluster0.d5kzac4.mongodb.net/socialnetwork?retryWrites=true&w=majority'
        }
    }
};

module.exports = CONFIG;