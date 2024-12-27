/**
 * @fileoverview Demonstrate find multiple operation to MongoDB Atlas Cluster
 * 
 * @description
 * Demonstrate find multiple operation to MongoDB Atlas Cluster
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
const countries = ['SG', 'ID', 'MY'];
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

        console.log("Print ABC");
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

    let data = [{
        "_id": 1, "results": [{ "product": "abc", "score": 10 },
        { "product": "xyz", "score": 5 }]
    },
    {
        "_id": 2, "results": [{ "product": "abc", "score": 8 },
        { "product": "xyz", "score": 7 }]
    },
    {
        "_id": 3, "results": [{ "product": "abc", "score": 7 },
        { "product": "xyz", "score": 8 }]
    },
    {
        "_id": 4, "results": [{ "product": "abc", "score": 7 },
        { "product": "def", "score": 8 }]
    },
    {
        "_id": 6, "results": [{ "product": "aaa", "score": 7 },
        { "product": "bbb", "score": 8 }]
    },
    {
        "_id": 7, "results": [{ "product": "ccc", "score": 7 },
        { "product": "ddd", "score": 8 }]
    },
    { "_id": 5, "results": { "product": "xyz", "score": 7 } }];

    // await devices.insertMany(data);
    console.log(`Device records have been inserted`);

    // const query1 = {
    //     results:
    //     {
    //         $elemMatch:
    //         {
    //             "product": "abc",
    //             score: { $gte: 8 }
    //         }
    //     }
    // }

    const query1 = {
        results:
        {
            $elemMatch:
            {
                $or: [
                    { "product": "abc" },
                    { score: { $gte: 8 } }
                ]

            }
        }
    }

    // const query1 = {
    //     results:
    //         { "product": "def", "score": 8 }
    // }
    // const query1 = {
    //     results:
    //         { "score": 8, "product": "def" }
    // }

    const options = {
        sort: { _id: -1 },
    };

    const cursor = await devices.find(query1, options);

    for await (const doc of cursor) {
        console.log(doc);
    }
};


main().catch(console.error);