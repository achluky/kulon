import { MongoClient as mongoClient } from "mongodb"
import { ObjectId } from "mongodb"
var db

class mongoDbClient {
    async connect(conn, onSuccess, onFailure){
        try {
            var connection = await mongoClient.connect(conn.url, { useNewUrlParser: true })
            this.db = connection.db(conn.dbName)
            info("MongoClient Connection successfull.")
            onSuccess()
        }
        catch(ex) {
            error("Error caught,", ex)
            onFailure(ex)
        }
    }


    async findOneDoc(coll, query) {
        if(!query.length){
            throw Error("mongoClient.isObject: query is not an object")
        }
        return this.db.collection(coll).findOne(query).toArray()
    }

}

export default {
  mongoDbClient,
  ObjectId
}
