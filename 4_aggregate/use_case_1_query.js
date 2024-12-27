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

async function crud(client) {
    const db = await client.db("food");
    console.log(`Connecting to Food DB`);
    const orders = db.collection("orders");

    const aggregrationRule = [
        // Stage 1: Filter pizza order documents by pizza size
        {
            $match: { size: "medium" }
        },
        // Stage 2: Group remaining documents by pizza name and calculate total quantity
        {
            $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
        }
    ]
    const result = await orders.aggregate(aggregrationRule).toArray();
    console.log(result)
};


main().catch(console.error);