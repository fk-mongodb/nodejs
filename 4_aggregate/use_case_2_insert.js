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
        { "_id": 1, "item": "almonds", "price": 12, "quantity": 2 },
        { "_id": 2, "item": "pecans", "price": 20, "quantity": 1 },
        { "_id": 3 }
    ]);
    await db.collection("inventory").insertMany([
        { "_id": 1, "sku": "almonds", "description": "product 1", "instock": 120 },
        { "_id": 2, "sku": "bread", "description": "product 2", "instock": 80 },
        { "_id": 3, "sku": "cashews", "description": "product 3", "instock": 60 },
        { "_id": 4, "sku": "pecans", "description": "product 4", "instock": 70 },
        { "_id": 5, "sku": null, "description": "Incomplete" },
        { "_id": 6 }
    ]);
};


main().catch(console.error);