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
    await db.collection("orders").insertMany([
        {
            _id: 1,
            item: "filet",
            restaurant_name: "American Steak House"
        },
        {
            _id: 2,
            item: "cheese pizza",
            restaurant_name: "Honest John Pizza",
            drink: "lemonade"
        },
        {
            _id: 3,
            item: "cheese pizza",
            restaurant_name: "Honest John Pizza",
            drink: "soda"
        }
    ]);
    await db.collection("restaurants").insertMany([
        {
            _id: 1,
            name: "American Steak House",
            food: ["filet", "sirloin"],
            beverages: ["beer", "wine"]
        },
        {
            _id: 2,
            name: "Honest John Pizza",
            food: ["cheese pizza", "pepperoni pizza"],
            beverages: ["soda"]
        }
    ]);
};


main().catch(console.error);