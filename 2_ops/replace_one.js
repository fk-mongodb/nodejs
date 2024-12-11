/**
 * @fileoverview Demonstrate replace one operation to MongoDB Atlas Cluster
 * 
 * @description
 * Demonstrate Basic replace  one operation to MongoDB Atlas Cluster
 * 
 * @author Fernando Karnagi <fkarnagi@gmail.com>
 * @version 1.0.0
 * @date 11-Dec-2024
 * 
 * @usage
 * cmd/2_crud.js
 */

const { MongoClient } = require('mongodb');
const moment = require('moment');

const types = ['DISTANCE', 'TEMPARATURE', 'COLOR'];

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.s70hf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await crud(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
const getRandomInteger = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}

async function crud(client) {
    const db = await client.db("sensors");
    console.log(`Connecting to Sensor DB`);
    const devices = db.collection("devices");
    const currentTs = moment().format("YYYYMMDDHHmmSS")
    const device = {
        code: `T${currentTs}`,
        description: `Sensor T${currentTs}`,
        type: types[getRandomInteger(0, 3)],
        price: getRandomInteger(10, 101)
    }
    const resultInsert = await devices.insertOne(device);
    console.log(`Device record has been inserted with _id: ${resultInsert.insertedId}`)

    const filter = { _id: resultInsert.insertedId };
    const replacementDoc = {
        code: `T${currentTs}-replace`,
        description: `Sensor T${currentTs}-replace`,
        type: types[getRandomInteger(0, 3)],
        price: getRandomInteger(10, 101)
    };
    const resultUpdate = await devices.replaceOne(filter, replacementDoc);
    console.log(resultUpdate);
};

main().catch(console.error);