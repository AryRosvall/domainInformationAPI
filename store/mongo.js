const { MongoClient, ObjectId } = require('mongodb');
const config = require('../config');

const dbHost = config.mongo.host;
const dbUser = encodeURIComponent(config.mongo.user);
const dbPassword = encodeURIComponent(config.mongo.password);
const dbName = config.mongo.database;

const MONGO_URI = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
/**
 * Class that handles the MongoDB connection and exposes the CRUD operations.
 * @class MongoLib
 */
class MongoLib {

  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = dbName;
  }

  /**
   * Creates an instance of MongoLib.
   * @returns {} Object
   * @memberof MongoLib
   */
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  /**
   * Method that list the collection and filtered with a query
   * @param {String} collection Name of the collection
   * @param {{}} query
   * @param {{skip: number, limit: number}} pagination
   * @returns {Promise <{}>}
   * @memberof MongoLib
   */
  list(collection) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).find()
          .toArray();
      })
      .catch((error) => this.errorMsgHandler(error));
  }

  /**
   * Method that retrieve a document of the collection by uid
   * @param {String} collection Name of the collection
   * @param {String} id Object id
   * @param {{}} projection Object that specifies the values that will return or not the query
   * @returns {Promise<{}>} Object with the results
   * @memberof MongoLib
   */
  get(collection, domain, projection = {}) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).findOne({ domain: domain }, { projection });
      })
      .catch((error) => {
        this.errorMsgHandler(error);
      });
  }

  /**
   * Method that insert a document in the collection
   * @param {String} collection Name of the collection
   * @param {{}} data Data to be inserted
   * @returns {Promise<{insertedId: number, insertedCount: number}>} Object with the results
   * @memberof MongoLib
   */
  insert(collection, data) {
    return this.connect().then((db) => {
      return db.collection(collection).insertOne(data);
    })
      .then((result) => (
        {
          insertedId: result.insertedCount > 0 ? result.insertedId : 0,
          insertedCount: result.insertedCount,
        }))
      .catch((error) => this.errorMsgHandler(error));

  }

  /**
   * Method that update a document of the collection
   * @param {String} collection Name of the collection
   * @param {{}} filter Object with data that will be used to search the document
   * @param {{}} setData Object with data that need to be replace in document
   * @returns {Promise<{matchedCount: number, updatedCount: number}>} Object with the results
   * @memberof MongoLib
   */
  update(collection, filter, setData = null, upsert = false) {

    let query = {};

    query = setData !== null || '' ? { ...query, $set: setData } : { ...query };

    return this.connect().then((db) => {
      return db.collection(collection).updateOne(filter, query, { upsert });
    })
      .then((result) => {
        return {
          matchedCount: result.matchedCount,
          updatedCount: result.modifiedCount,
        };
      })
      .catch((error) => this.errorMsgHandler(error));
  }

  /**
   * This manage the error that will be show
   * @param {*} error
   * @memberof MongoLib
   */
  errorMsgHandler(error) {
    this._msg = error.errmsg || error;
    throw new Error(this._msg);
  }
}

module.exports = MongoLib;
