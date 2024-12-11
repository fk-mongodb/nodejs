/**
 * @fileoverview Demonstrate find one operation to MongoDB Atlas Cluster
 * 
 * @description
 * Demonstrate find one operation to MongoDB Atlas Cluster
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
const count = 100;

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

    let data = [];

    for (let i = 0; i < count; i++) {
        const currentTs = moment().format("YYYYMMDDHHmmSS-" + i)
        const device = {
            code: `T${currentTs}`,
            description: `Sensor T${currentTs}`,
            type: types[getRandomInteger(0, 3)],
            price: getRandomInteger(10, 101)
        }
        data.push(device)

    }

    await devices.insertMany(data);
    console.log(`Device records have been inserted`);

    const query = {
        price: {
            $lt: 50
        }
    }

    const options = {
        // Sort matched documents in descending order by rating
        sort: { "type": -1 },
        // Include only the `title` and `imdb` fields in the returned document
        projection: { _id: 0, code: 1, description: 1, price: 1, type: 1 },
    };

    const result = await devices.findOne(query, options);
    console.log(result);

};

main().catch(console.error);