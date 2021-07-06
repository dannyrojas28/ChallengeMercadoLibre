const MongoClient = require('mongodb').MongoClient;
let db;
const loadDB = async () => {
    if (db) {
        return db;
    }
    try{
        const client = await MongoClient.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true});
        db = client.db(process.env.DB_NAME);
    }catch(err){
        throw err;
    }
    return db;
};

global.loadDB =  loadDB;