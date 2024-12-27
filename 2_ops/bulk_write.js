/**
 * @fileoverview Demonstrate Bulk Write operation to MongoDB Atlas Cluster
 * 
 * @description
 * Demonstrate Basic Insert operation to MongoDB Atlas Cluster
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

    const result = await devices.bulkWrite([
        { insertOne: { document: { _id: 3, type: "beef", size: "medium", price: 6 } } },
        { insertOne: { document: { _id: 4, type: "sausage", size: "large", price: 10 } } },
        {
            updateOne: {
                filter: { type: "cheese" },
                update: { $set: { price: 8 } }
            }
        },
        { deleteOne: { filter: { type: "pepperoni" } } },
        {
            replaceOne: {
                filter: { type: "vegan" },
                replacement: { type: "tofu", size: "small", price: 4 }
            }
        }
    ])
    console.log(`Bulk record has been done`);
    console.log(result)
};

main().catch(console.error);