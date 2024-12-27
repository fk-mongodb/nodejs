/**
 * @fileoverview Demonstrate simple use case for aggregation pipeline to MongoDB Atlas Cluster
 * 
 * @description
 * Demonstrate simple use case for aggregation pipeline to MongoDB Atlas Cluster
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
    const db = await client.db("food");
    console.log(`Connecting to Food DB`);
    const orders = db.collection("orders");

    let data = [
        {
            _id: 0, name: "Pepperoni", size: "small", price: 19,
            quantity: 10, date: moment("2021-03-13T08:14:30Z").toDate()
        },
        {
            _id: 1, name: "Pepperoni", size: "medium", price: 20,
            quantity: 20, date: moment("2021-03-13T09:13:24Z").toDate()
        },
        {
            _id: 2, name: "Pepperoni", size: "large", price: 21,
            quantity: 30, date: moment("2021-03-17T09:22:12Z").toDate()
        },
        {
            _id: 3, name: "Cheese", size: "small", price: 12,
            quantity: 15, date: moment("2021-03-13T11:21:39.736Z").toDate()
        },
        {
            _id: 4, name: "Cheese", size: "medium", price: 13,
            quantity: 50, date: moment("2022-01-12T21:23:13.331Z").toDate()
        },
        {
            _id: 5, name: "Cheese", size: "large", price: 14,
            quantity: 10, date: moment("2022-01-12T05:08:13Z").toDate()
        },
        {
            _id: 6, name: "Vegan", size: "small", price: 17,
            quantity: 10, date: moment("2021-01-13T05:08:13Z").toDate()
        },
        {
            _id: 7, name: "Vegan", size: "medium", price: 18,
            quantity: 10, date: moment("2021-01-13T05:10:13Z").toDate()
        }
    ];

    const result = await orders.insertMany(data);
    console.log(`Order records have been inserted`);
    console.log(result)
};


main().catch(console.error);